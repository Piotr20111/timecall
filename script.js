// Timer Hub Application with Firebase Integration
class TimerHub {
    constructor() {
        this.currentTimer = null;
        this.timerInterval = null;
        this.watchHistory = [];
        this.favoriteChannels = {};
        this.meetings = [];
        this.meetingsHistory = [];
        this.favoriteMeetings = [];
        this.youtubeMode = 'normal';
        this.isPaused = false;
        this.currentUser = null;
        this.firebaseUser = null;
        this.chatMessages = [];
        this.privateMessages = {};
        this.unreadMessages = 0;
        this.unreadPrivateMessages = 0;
        this.isFirebaseReady = false;
        this.presenceRef = null;
        this.lastReadMessageId = null;
        this.messageReads = {};
        this.selectedMessageId = null;
        this.currentPrivateChat = null;
        this.onlineUsers = {};
        this.allUsers = {}; // Store all users that have been online
        this.processedUsers = new Set(); // Track processed users to avoid duplicates
        this.customAvatar = null; // Store custom avatar selection
        
        // Settings
        this.settings = {
            notifications: true,
            chatNotifications: true,
            timerNotifications: true,
            pushNotifications: false,
            mutedUntil: null,
            region: 'pl-PL',
            timeFormat: '24h',
            deviceOptimization: 'auto',
            animations: true,
            reducedMotion: false,
            showOnlineStatus: true,
            showReadReceipts: true,
            colorTheme: 'default',
            fontSize: 'normal',
            cardStyle: 'default',
            compactMode: false
        };
        
        // Security measures
        this.initSecurityMeasures();
        
        // Load settings
        this.loadSettings();
        
        // Wait for Firebase to be available
        this.waitForFirebase();
    }
    
    // Security initialization
    initSecurityMeasures() {
        // Prevent right-click on sensitive elements
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.chat-message, .user-info, .private-user-item')) {
                e.preventDefault();
            }
        });
        
        // Sanitize all inputs
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.sanitizeInput(e.target);
            }
        });
        
        // Session timeout after 30 minutes of inactivity
        this.resetSessionTimeout();
        document.addEventListener('click', () => this.resetSessionTimeout());
        document.addEventListener('keypress', () => this.resetSessionTimeout());
    }
    
    resetSessionTimeout() {
        if (this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
        }
        
        this.sessionTimeout = setTimeout(() => {
            if (this.currentUser) {
                this.showNotification('Sesja wygasła. Zaloguj się ponownie.', 'warning');
                this.logout();
            }
        }, 30 * 60 * 1000); // 30 minutes
    }
    
    sanitizeInput(input) {
        // Basic XSS prevention
        const dangerous = /<script|javascript:|onclick|onerror|onload/gi;
        if (dangerous.test(input.value)) {
            input.value = input.value.replace(dangerous, '');
            this.showNotification('Wykryto niedozwolone znaki', 'warning');
        }
    }
    
    loadSettings() {
        const savedSettings = localStorage.getItem('timerHubSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            this.applySettings();
        }
    }
    
    saveSettings() {
        localStorage.setItem('timerHubSettings', JSON.stringify(this.settings));
    }
    
    applySettings() {
        // Apply color theme
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        if (this.settings.colorTheme !== 'default') {
            document.body.classList.add(`theme-${this.settings.colorTheme}`);
        }
        
        // Apply font size
        document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large', 'font-size-xlarge');
        document.body.classList.add(`font-size-${this.settings.fontSize}`);
        
        // Apply card style
        document.body.classList.remove('card-style-flat', 'card-style-neumorphic', 'card-style-glassmorphic');
        if (this.settings.cardStyle !== 'default') {
            document.body.classList.add(`card-style-${this.settings.cardStyle}`);
        }
        
        // Apply compact mode
        if (this.settings.compactMode) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
        
        // Apply device optimization
        document.body.classList.remove('mobile-optimized', 'desktop-optimized');
        if (this.settings.deviceOptimization !== 'auto') {
            document.body.classList.add(`${this.settings.deviceOptimization}-optimized`);
        }
        
        // Apply animations
        if (!this.settings.animations || this.settings.reducedMotion) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        
        // Update UI elements
        document.getElementById('enableNotifications').checked = this.settings.notifications;
        document.getElementById('enableChatNotifications').checked = this.settings.chatNotifications;
        document.getElementById('enableTimerNotifications').checked = this.settings.timerNotifications;
        document.getElementById('enablePushNotifications').checked = this.settings.pushNotifications;
        document.getElementById('regionSelect').value = this.settings.region;
        document.getElementById('timeFormat').value = this.settings.timeFormat;
        document.getElementById('deviceOptimization').value = this.settings.deviceOptimization;
        document.getElementById('enableAnimations').checked = this.settings.animations;
        document.getElementById('reducedMotion').checked = this.settings.reducedMotion;
        document.getElementById('showOnlineStatus').checked = this.settings.showOnlineStatus;
        document.getElementById('showReadReceipts').checked = this.settings.showReadReceipts;
        document.getElementById('colorTheme').value = this.settings.colorTheme;
        document.getElementById('fontSize').value = this.settings.fontSize;
        document.getElementById('cardStyle').value = this.settings.cardStyle;
        document.getElementById('enableCompactMode').checked = this.settings.compactMode;
    }
    
    // Avatar management
    openAvatarModal() {
        document.getElementById('avatarModal').classList.add('active');
    }
    
    closeAvatarModal() {
        document.getElementById('avatarModal').classList.remove('active');
    }
    
    selectAvatar(avatarType) {
        const avatarMap = {
            'astronaut': '🧑‍🚀',
            'ninja': '🥷',
            'wizard': '🧙‍♂️',
            'robot': '🤖',
            'alien': '👽',
            'superhero': '🦸',
            'pirate': '🏴‍☠️',
            'unicorn': '🦄',
            'dragon': '🐉',
            'phoenix': '🔥',
            'owl': '🦉',
            'fox': '🦊',
            'wolf': '🐺',
            'lion': '🦁',
            'crown': '👑'
        };
        
        this.customAvatar = avatarMap[avatarType];
        
        // Save custom avatar to localStorage
        if (this.currentUser) {
            localStorage.setItem(`customAvatar_${this.currentUser.sub}`, this.customAvatar);
        }
        
        // Update avatar display
        this.updateAvatarDisplay();
        
        // Update Firebase profile if connected
        if (this.firebaseUser && this.isFirebaseReady) {
            this.updateFirebaseUserProfile(this.currentUser);
        }
        
        this.closeAvatarModal();
        this.showNotification('Avatar zmieniony!', 'success');
    }
    
    resetToGoogleAvatar() {
        this.customAvatar = null;
        
        // Remove custom avatar from localStorage
        if (this.currentUser) {
            localStorage.removeItem(`customAvatar_${this.currentUser.sub}`);
        }
        
        // Update avatar display
        this.updateAvatarDisplay();
        
        // Update Firebase profile if connected
        if (this.firebaseUser && this.isFirebaseReady) {
            this.updateFirebaseUserProfile(this.currentUser);
        }
        
        this.closeAvatarModal();
        this.showNotification('Przywrócono zdjęcie Google', 'success');
    }
    
    updateAvatarDisplay() {
        const avatarElement = document.getElementById('userAvatar');
        
        if (this.customAvatar) {
            // Create data URL for emoji avatar
            const canvas = document.createElement('canvas');
            canvas.width = 100;
            canvas.height = 100;
            const ctx = canvas.getContext('2d');
            
            // Background
            ctx.fillStyle = '#6366f1';
            ctx.fillRect(0, 0, 100, 100);
            
            // Emoji
            ctx.font = '60px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.customAvatar, 50, 50);
            
            avatarElement.src = canvas.toDataURL();
        } else if (this.currentUser && this.currentUser.picture) {
            avatarElement.src = this.currentUser.picture;
        }
    }
    
    loadCustomAvatar() {
        if (this.currentUser) {
            const savedAvatar = localStorage.getItem(`customAvatar_${this.currentUser.sub}`);
            if (savedAvatar) {
                this.customAvatar = savedAvatar;
                this.updateAvatarDisplay();
            }
        }
    }
    
    changeColorTheme(theme) {
        this.settings.colorTheme = theme;
        this.saveSettings();
        this.applySettings();
    }
    
    changeFontSize(size) {
        this.settings.fontSize = size;
        this.saveSettings();
        this.applySettings();
    }
    
    changeCardStyle(style) {
        this.settings.cardStyle = style;
        this.saveSettings();
        this.applySettings();
    }
    
    toggleCompactMode() {
        this.settings.compactMode = document.getElementById('enableCompactMode').checked;
        this.saveSettings();
        this.applySettings();
    }
    
    toggleSettings() {
        const panel = document.getElementById('settingsPanel');
        panel.classList.toggle('active');
    }
    
    updateNotificationSettings() {
        this.settings.notifications = document.getElementById('enableNotifications').checked;
        this.settings.chatNotifications = document.getElementById('enableChatNotifications').checked;
        this.settings.timerNotifications = document.getElementById('enableTimerNotifications').checked;
        this.saveSettings();
    }
    
    togglePushNotifications() {
        const enabled = document.getElementById('enablePushNotifications').checked;
        if (enabled) {
            this.requestPushNotificationPermission();
        } else {
            this.settings.pushNotifications = false;
            this.saveSettings();
        }
    }
    
    async requestPushNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            this.settings.pushNotifications = permission === 'granted';
            document.getElementById('enablePushNotifications').checked = this.settings.pushNotifications;
            this.saveSettings();
            
            if (permission === 'granted') {
                this.showNotification('Powiadomienia push włączone!', 'success');
            } else {
                this.showNotification('Odmówiono dostępu do powiadomień', 'error');
            }
        } else {
            this.showNotification('Twoja przeglądarka nie obsługuje powiadomień', 'error');
            document.getElementById('enablePushNotifications').checked = false;
        }
    }
    
    muteNotifications(duration) {
        if (duration === '0') {
            this.settings.mutedUntil = null;
        } else if (duration === '-1') {
            this.settings.mutedUntil = 'forever';
        } else {
            const until = new Date();
            until.setMinutes(until.getMinutes() + parseInt(duration));
            this.settings.mutedUntil = until.toISOString();
        }
        this.saveSettings();
    }
    
    changeRegion(region) {
        this.settings.region = region;
        this.saveSettings();
        this.updateCurrentTime();
    }
    
    changeTimeFormat(format) {
        this.settings.timeFormat = format;
        this.saveSettings();
        this.updateCurrentTime();
    }
    
    changeDeviceOptimization(mode) {
        this.settings.deviceOptimization = mode;
        this.saveSettings();
        this.applySettings();
    }
    
    toggleAnimations() {
        this.settings.animations = document.getElementById('enableAnimations').checked;
        this.saveSettings();
        this.applySettings();
    }
    
    toggleReducedMotion() {
        this.settings.reducedMotion = document.getElementById('reducedMotion').checked;
        this.saveSettings();
        this.applySettings();
    }
    
    updatePrivacySettings() {
        this.settings.showOnlineStatus = document.getElementById('showOnlineStatus').checked;
        this.settings.showReadReceipts = document.getElementById('showReadReceipts').checked;
        this.saveSettings();
        
        if (this.firebaseUser) {
            this.updateOnlineStatus();
        }
    }
    
    async exportData() {
        const data = {
            watchHistory: this.watchHistory,
            favoriteChannels: this.favoriteChannels,
            meetings: this.meetings,
            meetingsHistory: this.meetingsHistory,
            favoriteMeetings: this.favoriteMeetings,
            settings: this.settings,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `timer-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Dane wyeksportowane pomyślnie', 'success');
    }
    
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                
                // Validate data structure
                if (!this.validateImportData(data)) {
                    throw new Error('Invalid data format');
                }
                
                if (confirm('Czy na pewno chcesz zaimportować dane? To zastąpi obecne dane.')) {
                    this.watchHistory = data.watchHistory || [];
                    this.favoriteChannels = data.favoriteChannels || {};
                    this.meetings = data.meetings || [];
                    this.meetingsHistory = data.meetingsHistory || [];
                    this.favoriteMeetings = data.favoriteMeetings || [];
                    this.settings = { ...this.settings, ...(data.settings || {}) };
                    
                    // Save all data
                    await this.saveAllUserData();
                    this.saveSettings();
                    
                    // Refresh UI
                    this.applySettings();
                    this.updateStats();
                    this.loadFavoriteChannels();
                    this.loadWatchHistory();
                    this.loadUpcomingMeetings();
                    this.loadMeetingsHistory();
                    this.loadFavoriteMeetings();
                    
                    this.showNotification('Dane zaimportowane pomyślnie', 'success');
                }
            } catch (error) {
                console.error('Import error:', error);
                this.showNotification('Błąd importu danych', 'error');
            }
        };
        
        input.click();
    }
    
    validateImportData(data) {
        // Basic validation to prevent malicious data
        return data && 
               typeof data === 'object' &&
               (!data.watchHistory || Array.isArray(data.watchHistory)) &&
               (!data.meetings || Array.isArray(data.meetings)) &&
               (!data.meetingsHistory || Array.isArray(data.meetingsHistory)) &&
               (!data.favoriteMeetings || Array.isArray(data.favoriteMeetings));
    }
    
    async clearAllData() {
        if (confirm('Czy na pewno chcesz usunąć WSZYSTKIE dane? Ta operacja jest nieodwracalna!')) {
            if (confirm('Czy jesteś absolutnie pewien? Wszystkie dane zostaną trwale usunięte.')) {
                // Clear all data
                this.watchHistory = [];
                this.favoriteChannels = {};
                this.meetings = [];
                this.meetingsHistory = [];
                this.favoriteMeetings = [];
                
                // Clear from storage
                if (this.currentUser) {
                    const userKey = this.currentUser.sub;
                    localStorage.removeItem(`watchHistory_${userKey}`);
                    localStorage.removeItem(`favoriteChannels_${userKey}`);
                    localStorage.removeItem(`meetings_${userKey}`);
                    localStorage.removeItem(`meetingsHistory_${userKey}`);
                    localStorage.removeItem(`favoriteMeetings_${userKey}`);
                }
                
                // Clear from Firebase
                if (this.firebaseUser && this.isFirebaseReady) {
                    const userId = this.firebaseUser.uid;
                    const userRef = window.firebase.ref(window.firebase.database, `users/${userId}`);
                    await window.firebase.remove(userRef);
                }
                
                // Reset settings
                this.settings = {
                    notifications: true,
                    chatNotifications: true,
                    timerNotifications: true,
                    pushNotifications: false,
                    mutedUntil: null,
                    region: 'pl-PL',
                    timeFormat: '24h',
                    deviceOptimization: 'auto',
                    animations: true,
                    reducedMotion: false,
                    showOnlineStatus: true,
                    showReadReceipts: true,
                    colorTheme: 'default',
                    fontSize: 'normal',
                    cardStyle: 'default',
                    compactMode: false
                };
                this.saveSettings();
                
                // Refresh UI
                this.applySettings();
                this.updateStats();
                this.loadFavoriteChannels();
                this.loadWatchHistory();
                this.loadUpcomingMeetings();
                this.loadMeetingsHistory();
                this.loadFavoriteMeetings();
                
                this.showNotification('Wszystkie dane zostały usunięte', 'success');
            }
        }
    }
    
    waitForFirebase() {
        const checkFirebase = setInterval(() => {
            if (window.firebase && window.firebase.auth) {
                clearInterval(checkFirebase);
                this.initializeFirebase();
            }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => {
            clearInterval(checkFirebase);
            if (!this.isFirebaseReady) {
                console.error('Firebase failed to load');
                this.init();
            }
        }, 5000);
    }
    
    initializeFirebase() {
        this.isFirebaseReady = true;
        console.log('Firebase is ready');
        
        // Listen for auth state changes
        window.firebase.onAuthStateChanged(window.firebase.auth, async (user) => {
            if (user) {
                console.log('Firebase user authenticated:', user.uid);
                this.firebaseUser = user;
                await this.setupUserPresence();
                await this.syncUserData();
                this.listenToChat();
                this.listenToMessageReads();
                this.listenToOnlineUsers();
                this.listenToPrivateMessages();
                this.loadAllUsersFromFirebase();
                this.updateOnlineUsers();
                this.loadLastReadMessage();
            } else {
                console.log('No Firebase user detected');
            }
        });
        
        // Initialize app
        this.init();
    }
    
    async createAnonymousUser() {
        if (!this.isFirebaseReady) {
            console.error('Firebase not ready');
            return false;
        }
        
        try {
            console.log('Creating anonymous user...');
            const userCredential = await window.firebase.signInAnonymously(window.firebase.auth);
            this.firebaseUser = userCredential.user;
            console.log('Anonymous user created:', this.firebaseUser.uid);
            
            // Update profile with Google data if available
            if (this.currentUser) {
                await this.updateFirebaseUserProfile(this.currentUser);
            }
            
            // Setup presence and listeners
            await this.setupUserPresence();
            await this.syncUserData();
            this.listenToChat();
            this.listenToMessageReads();
            this.listenToOnlineUsers();
            this.listenToPrivateMessages();
            this.loadAllUsersFromFirebase();
            this.updateOnlineUsers();
            this.loadLastReadMessage();
            
            return true;
        } catch (error) {
            console.error('Error creating anonymous user:', error);
            return false;
        }
    }
    
    async updateFirebaseUserProfile(googleUser) {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        const userId = this.firebaseUser.uid;
        const profileRef = window.firebase.ref(window.firebase.database, `users/${userId}/profile`);
        
        try {
            const profileData = {
                name: googleUser.name,
                email: googleUser.email,
                picture: this.customAvatar || googleUser.picture,
                googleId: googleUser.sub,
                lastActive: window.firebase.serverTimestamp(),
                hasCustomAvatar: !!this.customAvatar
            };
            
            await window.firebase.set(profileRef, profileData);
        } catch (error) {
            console.error('Error updating Firebase profile:', error);
        }
    }
    
    init() {
        // Check pending login
        const pendingLogin = localStorage.getItem('pendingGoogleLogin');
        if (pendingLogin) {
            try {
                const data = JSON.parse(pendingLogin);
                this.handleGoogleLogin(data.userInfo, data.credential);
                localStorage.removeItem('pendingGoogleLogin');
                return;
            } catch (error) {
                console.error('Error processing pending login:', error);
                localStorage.removeItem('pendingGoogleLogin');
            }
        }
        
        // Check if user is logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.showApp();
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('currentUser');
                // Show login screen if error
                document.getElementById('loginScreen').style.display = 'flex';
                document.getElementById('loadingScreen').style.display = 'none';
            }
        } else {
            // No user logged in - show login screen
            document.getElementById('loginScreen').style.display = 'flex';
            document.getElementById('loadingScreen').style.display = 'none';
        }
        
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        const meetingDateEl = document.getElementById('meetingDate');
        const videoDateEl = document.getElementById('videoDate');
        if (meetingDateEl) meetingDateEl.value = today;
        if (videoDateEl) videoDateEl.value = today;
        
        // Setup message context menu
        this.setupMessageContextMenu();
    }
    
    setupMessageContextMenu() {
        // Close context menu when clicking outside
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('messageContextMenu');
            if (!menu.contains(e.target)) {
                menu.style.display = 'none';
            }
        });
        
        // Handle double click on messages
        document.addEventListener('dblclick', (e) => {
            const message = e.target.closest('.chat-message');
            if (message && !message.classList.contains('system')) {
                e.preventDefault();
                this.showMessageContextMenu(e, message);
            }
        });
    }
    
    showMessageContextMenu(event, messageElement) {
        const menu = document.getElementById('messageContextMenu');
        const messageId = messageElement.dataset.messageId;
        const isOwn = messageElement.classList.contains('own');
        
        this.selectedMessageId = messageId;
        
        // Show/hide delete button based on ownership
        document.getElementById('deleteMessageBtn').style.display = isOwn ? 'flex' : 'none';
        
        // Calculate position to keep menu in viewport
        let x = event.pageX;
        let y = event.pageY;
        
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Temporarily show menu to get dimensions
        menu.style.display = 'block';
        const menuWidth = menu.offsetWidth;
        const menuHeight = menu.offsetHeight;
        
        // Adjust position if menu would go off-screen
        if (x + menuWidth > viewportWidth - 20) {
            x = viewportWidth - menuWidth - 20;
        }
        
        if (y + menuHeight > viewportHeight - 20) {
            y = viewportHeight - menuHeight - 20;
        }
        
        // Ensure minimum distance from edges
        x = Math.max(10, x);
        y = Math.max(10, y);
        
        // Position menu
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
    }
    
    copyMessageFromMenu() {
        if (this.selectedMessageId) {
            this.copyMessage(this.selectedMessageId);
            document.getElementById('messageContextMenu').style.display = 'none';
        }
    }
    
    deleteMessageFromMenu() {
        if (this.selectedMessageId) {
            this.deleteMessage(this.selectedMessageId);
            document.getElementById('messageContextMenu').style.display = 'none';
        }
    }
    
    async handleGoogleLogin(userInfo, credential) {
        try {
            this.currentUser = {
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture,
                sub: userInfo.sub
            };
            
            // Save user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            // Show app first
            this.showApp();
            
            // Then handle Firebase authentication
            if (this.isFirebaseReady && !this.firebaseUser) {
                // Create anonymous user immediately after Google login
                await this.createAnonymousUser();
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Błąd logowania. Spróbuj ponownie.');
        }
    }
    
    async setupUserPresence() {
        if (!this.firebaseUser || !this.isFirebaseReady || !this.currentUser) return;
        
        const userId = this.firebaseUser.uid;
        const userStatusDatabaseRef = window.firebase.ref(window.firebase.database, `presence/${userId}`);
        
        const isOfflineForDatabase = {
            state: 'offline',
            last_changed: window.firebase.serverTimestamp()
        };
        
        const isOnlineForDatabase = {
            state: 'online',
            last_changed: window.firebase.serverTimestamp(),
            user_info: {
                name: this.currentUser.name,
                email: this.currentUser.email,
                picture: this.customAvatar || this.currentUser.picture
            }
        };
        
        if (!this.settings.showOnlineStatus) {
            isOnlineForDatabase.state = 'hidden';
        }
        
        const connectedRef = window.firebase.ref(window.firebase.database, '.info/connected');
        
        window.firebase.onValue(connectedRef, (snapshot) => {
            if (snapshot.val() === false) {
                return;
            }
            
            window.firebase.onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(() => {
                window.firebase.set(userStatusDatabaseRef, isOnlineForDatabase);
            });
        });
        
        this.presenceRef = userStatusDatabaseRef;
    }
    
    updateOnlineStatus() {
        if (!this.presenceRef || !this.isFirebaseReady) return;
        
        const status = this.settings.showOnlineStatus ? 'online' : 'hidden';
        window.firebase.set(this.presenceRef, {
            state: status,
            last_changed: window.firebase.serverTimestamp(),
            user_info: {
                name: this.currentUser.name,
                email: this.currentUser.email,
                picture: this.customAvatar || this.currentUser.picture
            }
        });
    }
    
    async syncUserData() {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        const userId = this.firebaseUser.uid;
        const userRef = window.firebase.ref(window.firebase.database, `users/${userId}`);
        
        try {
            const snapshot = await window.firebase.get(userRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                this.watchHistory = data.watchHistory || [];
                this.favoriteChannels = data.favoriteChannels || {};
                this.meetings = data.meetings || [];
                this.meetingsHistory = data.meetingsHistory || [];
                this.favoriteMeetings = data.favoriteMeetings || [];
                
                // Update UI
                this.updateStats();
                this.loadFavoriteChannels();
                this.loadWatchHistory();
                this.loadUpcomingMeetings();
                this.loadMeetingsHistory();
                this.loadFavoriteMeetings();
            } else {
                // First time user - save initial data
                this.saveAllUserData();
            }
        } catch (error) {
            console.error('Error loading user data from Firebase:', error);
            // Load from localStorage as fallback
            this.loadUserDataFromLocalStorage();
        }
    }
    
    loadUserDataFromLocalStorage() {
        if (!this.currentUser) return;
        const userKey = this.currentUser.sub;
        this.watchHistory = this.loadFromStorage(`watchHistory_${userKey}`) || [];
        this.favoriteChannels = this.loadFromStorage(`favoriteChannels_${userKey}`) || {};
        this.meetings = this.loadFromStorage(`meetings_${userKey}`) || [];
        this.meetingsHistory = this.loadFromStorage(`meetingsHistory_${userKey}`) || [];
        this.favoriteMeetings = this.loadFromStorage(`favoriteMeetings_${userKey}`) || [];
    }
    
    async saveAllUserData() {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        const userId = this.firebaseUser.uid;
        const userRef = window.firebase.ref(window.firebase.database, `users/${userId}`);
        
        const userData = {
            profile: {
                name: this.currentUser.name,
                email: this.currentUser.email,
                picture: this.customAvatar || this.currentUser.picture,
                lastActive: window.firebase.serverTimestamp()
            },
            watchHistory: this.watchHistory,
            favoriteChannels: this.favoriteChannels,
            meetings: this.meetings,
            meetingsHistory: this.meetingsHistory,
            favoriteMeetings: this.favoriteMeetings
        };
        
        try {
            await window.firebase.set(userRef, userData);
        } catch (error) {
            console.error('Error saving user data to Firebase:', error);
        }
    }
    
    async saveUserData(key, data) {
        // Always save to localStorage
        const userKey = this.currentUser.sub;
        this.saveToStorage(`${key}_${userKey}`, data);
        
        // Try to save to Firebase
        if (this.firebaseUser && this.isFirebaseReady) {
            const userId = this.firebaseUser.uid;
            const dataRef = window.firebase.ref(window.firebase.database, `users/${userId}/${key}`);
            
            try {
                await window.firebase.set(dataRef, data);
            } catch (error) {
                console.error(`Error saving ${key} to Firebase:`, error);
            }
        }
    }
    
    async loadAllUsersFromFirebase() {
        if (!this.isFirebaseReady) return;
        
        try {
            // Clear processed users set for fresh load
            this.processedUsers.clear();
            
            // Load all users who have profiles
            const usersRef = window.firebase.ref(window.firebase.database, 'users');
            const snapshot = await window.firebase.get(usersRef);
            
            if (snapshot.exists()) {
                snapshot.forEach((userSnapshot) => {
                    const userId = userSnapshot.key;
                    const userData = userSnapshot.val();
                    if (userData.profile && !this.processedUsers.has(userId)) {
                        this.allUsers[userId] = userData.profile;
                        this.processedUsers.add(userId);
                    }
                });
            }
        } catch (error) {
            console.error('Error loading all users:', error);
        }
    }
    
    listenToOnlineUsers() {
        if (!this.isFirebaseReady) return;
        
        try {
            const presenceRef = window.firebase.ref(window.firebase.database, 'presence');
            
            window.firebase.onValue(presenceRef, (snapshot) => {
                this.onlineUsers = {};
                let onlineCount = 0;
                
                snapshot.forEach((childSnapshot) => {
                    const userId = childSnapshot.key;
                    const presence = childSnapshot.val();
                    
                    if (presence.state === 'online') {
                        onlineCount++;
                        this.onlineUsers[userId] = presence;
                    }
                });
                
                document.getElementById('onlineCount').textContent = onlineCount;
                this.updatePrivateUsersList();
            });
        } catch (error) {
            console.error('Error listening to online users:', error);
        }
    }
    
    updatePrivateUsersList() {
        const container = document.getElementById('privateUsersList');
        
        // Clear processed users tracking for this update
        const displayedUsers = new Map();
        
        // Process online users first
        Object.entries(this.onlineUsers).forEach(([userId, presence]) => {
            if (userId !== this.firebaseUser?.uid && !displayedUsers.has(userId)) {
                displayedUsers.set(userId, {
                    userId,
                    userInfo: presence.user_info || {},
                    isOnline: true
                });
            }
        });
        
        // Then add offline users from allUsers
        Object.entries(this.allUsers).forEach(([userId, userInfo]) => {
            if (userId !== this.firebaseUser?.uid && !displayedUsers.has(userId)) {
                displayedUsers.set(userId, {
                    userId,
                    userInfo,
                    isOnline: false
                });
            }
        });
        
        if (displayedUsers.size === 0) {
            container.innerHTML = '<p class="empty-state">Brak dostępnych użytkowników</p>';
            return;
        }
        
        const usersList = Array.from(displayedUsers.values()).map(user => {
            const unreadCount = this.getUnreadPrivateMessages(user.userId);
            
            return {
                ...user,
                unreadCount,
                name: user.userInfo.name || 'Użytkownik',
                picture: user.userInfo.picture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff'
            };
        });
        
        // Sort: online users first, then by name
        usersList.sort((a, b) => {
            if (a.isOnline && !b.isOnline) return -1;
            if (!a.isOnline && b.isOnline) return 1;
            return a.name.localeCompare(b.name);
        });
        
        container.innerHTML = usersList.map(user => `
            <div class="private-user-item" onclick="window.app.openPrivateChat('${user.userId}', '${this.escapeHtml(user.name)}', '${user.picture}')">
                <img class="private-user-avatar" src="${user.picture}" alt="${this.escapeHtml(user.name)}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff'">
                <div class="private-user-info">
                    <div class="private-user-name">${this.escapeHtml(user.name)}</div>
                    <div class="private-user-status ${user.isOnline ? 'online' : ''}">${user.isOnline ? 'Online' : 'Offline'}</div>
                </div>
                ${user.unreadCount > 0 ? `<span class="unread-count">${user.unreadCount}</span>` : ''}
            </div>
        `).join('');
    }
    
    refreshUsersList() {
        this.loadAllUsersFromFirebase();
        this.updatePrivateUsersList();
        this.showNotification('Lista użytkowników odświeżona', 'success');
    }
    
    getUnreadPrivateMessages(userId) {
        const messages = this.privateMessages[userId] || [];
        return messages.filter(msg => msg.senderId === userId && !msg.read).length;
    }
    
    switchChatTab(tab) {
        // Update tabs
        document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update content
        document.querySelectorAll('.chat-content').forEach(c => c.classList.remove('active'));
        
        if (tab === 'global') {
            document.getElementById('globalChatContent').classList.add('active');
        } else {
            document.getElementById('privateChatContent').classList.add('active');
            this.updatePrivateUsersList();
        }
    }
    
    async openPrivateChat(userId, userName, userPicture) {
        this.currentPrivateChat = { userId, userName, userPicture };
        
        // Show private chat window
        document.getElementById('privateChatWindow').style.display = 'flex';
        
        // Update header
        document.getElementById('privateChatUsername').textContent = userName;
        document.getElementById('privateChatAvatar').src = userPicture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff';
        
        // Load messages
        this.loadPrivateMessages(userId);
        
        // Mark messages as read
        this.markPrivateMessagesAsRead(userId);
        
        // Focus input
        document.getElementById('privateChatInput').focus();
    }
    
    backToUsersList() {
        document.getElementById('privateChatWindow').style.display = 'none';
        this.currentPrivateChat = null;
        this.updatePrivateUsersList();
    }
    
    listenToPrivateMessages() {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        const userId = this.firebaseUser.uid;
        const messagesRef = window.firebase.ref(window.firebase.database, `privateMessages/${userId}`);
        
        window.firebase.onValue(messagesRef, (snapshot) => {
            const allMessages = {};
            
            snapshot.forEach((conversationSnapshot) => {
                const otherUserId = conversationSnapshot.key;
                const messages = [];
                
                conversationSnapshot.forEach((messageSnapshot) => {
                    messages.push({
                        id: messageSnapshot.key,
                        ...messageSnapshot.val()
                    });
                });
                
                allMessages[otherUserId] = messages.sort((a, b) => a.timestamp - b.timestamp);
            });
            
            this.privateMessages = allMessages;
            
            // Update unread count
            this.updateUnreadPrivateMessages();
            
            // Update current chat if open
            if (this.currentPrivateChat) {
                this.displayPrivateMessages(this.currentPrivateChat.userId);
            }
            
            // Update users list
            this.updatePrivateUsersList();
        });
    }
    
    updateUnreadPrivateMessages() {
        let totalUnread = 0;
        
        Object.entries(this.privateMessages).forEach(([userId, messages]) => {
            const unread = messages.filter(msg => msg.senderId === userId && !msg.read).length;
            totalUnread += unread;
        });
        
        this.unreadPrivateMessages = totalUnread;
        
        const badge = document.getElementById('pmBadge');
        if (totalUnread > 0) {
            badge.textContent = totalUnread > 99 ? '99+' : totalUnread;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
    
    async sendPrivateMessage(event) {
        event.preventDefault();
        
        if (!this.currentPrivateChat || !this.firebaseUser) return;
        
        const input = document.getElementById('privateChatInput');
        const content = input.value.trim();
        
        if (!content || content.length > 500) return;
        
        input.value = '';
        
        const message = {
            senderId: this.firebaseUser.uid,
            senderName: this.currentUser.name,
            senderPicture: this.customAvatar || this.currentUser.picture,
            content: this.escapeHtml(content),
            timestamp: Date.now(),
            read: false
        };
        
        try {
            // Send to recipient
            const recipientRef = window.firebase.ref(
                window.firebase.database, 
                `privateMessages/${this.currentPrivateChat.userId}/${this.firebaseUser.uid}`
            );
            await window.firebase.push(recipientRef, message);
            
            // Send to self (for history)
            const selfRef = window.firebase.ref(
                window.firebase.database, 
                `privateMessages/${this.firebaseUser.uid}/${this.currentPrivateChat.userId}`
            );
            await window.firebase.push(selfRef, { ...message, read: true });
            
            // Send notification to recipient if they're online
            if (this.shouldShowNotification('chat') && this.settings.pushNotifications) {
                this.sendPushNotification(
                    `Nowa wiadomość od ${this.currentUser.name}`,
                    content.substring(0, 100)
                );
            }
            
        } catch (error) {
            console.error('Error sending private message:', error);
            this.showNotification('Błąd wysyłania wiadomości', 'error');
        }
    }
    
    loadPrivateMessages(userId) {
        const messages = this.privateMessages[userId] || [];
        this.displayPrivateMessages(userId);
    }
    
    displayPrivateMessages(userId) {
        const container = document.getElementById('privateMessages');
        const messages = this.privateMessages[userId] || [];
        
        if (messages.length === 0) {
            container.innerHTML = `
                <div class="chat-welcome">
                    <i class="fas fa-comments"></i>
                    <p>Rozpocznij prywatną rozmowę</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = messages.map(msg => {
            const isOwn = msg.senderId === this.firebaseUser?.uid;
            const date = new Date(msg.timestamp);
            const time = date.toLocaleTimeString(this.settings.region, { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: this.settings.timeFormat === '12h'
            });
            
            return `
                <div class="chat-message ${isOwn ? 'own' : ''}" data-message-id="${msg.id}">
                    <div class="message-header">
                        <span class="message-author">${this.escapeHtml(msg.senderName)}</span>
                        <span class="message-time">${time}</span>
                    </div>
                    <div class="message-content">${msg.content}</div>
                </div>
            `;
        }).join('');
        
        container.scrollTop = container.scrollHeight;
    }
    
    async markPrivateMessagesAsRead(userId) {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        const messages = this.privateMessages[userId] || [];
        const unreadMessages = messages.filter(msg => msg.senderId === userId && !msg.read);
        
        for (const msg of unreadMessages) {
            const messageRef = window.firebase.ref(
                window.firebase.database,
                `privateMessages/${this.firebaseUser.uid}/${userId}/${msg.id}`
            );
            
            try {
                await window.firebase.set(messageRef, { ...msg, read: true });
            } catch (error) {
                console.error('Error marking message as read:', error);
            }
        }
        
        this.updateUnreadPrivateMessages();
    }
    
    loadLastReadMessage() {
        if (!this.firebaseUser) return;
        
        const savedLastRead = localStorage.getItem(`lastReadMessage_${this.firebaseUser.uid}`);
        if (savedLastRead) {
            this.lastReadMessageId = savedLastRead;
        }
    }
    
    async markMessageAsRead(messageId) {
        if (!this.firebaseUser || !this.isFirebaseReady || !this.settings.showReadReceipts) return;
        
        try {
            const readRef = window.firebase.ref(window.firebase.database, `chat/reads/${messageId}/${this.firebaseUser.uid}`);
            await window.firebase.set(readRef, {
                userId: this.firebaseUser.uid,
                userName: this.currentUser.name,
                readAt: window.firebase.serverTimestamp()
            });
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    }
    
    listenToMessageReads() {
        if (!this.isFirebaseReady) return;
        
        try {
            const readsRef = window.firebase.ref(window.firebase.database, 'chat/reads');
            
            window.firebase.onValue(readsRef, (snapshot) => {
                this.messageReads = {};
                snapshot.forEach((messageSnapshot) => {
                    const messageId = messageSnapshot.key;
                    const readers = [];
                    messageSnapshot.forEach((readerSnapshot) => {
                        readers.push(readerSnapshot.val());
                    });
                    this.messageReads[messageId] = readers;
                });
                
                // Update display to show read receipts
                this.displayChatMessages();
            });
        } catch (error) {
            console.error('Error listening to message reads:', error);
        }
    }
    
    listenToChat() {
        if (!this.isFirebaseReady) return;
        
        try {
            const chatRef = window.firebase.ref(window.firebase.database, 'chat/messages');
            const chatQuery = window.firebase.query(chatRef, window.firebase.orderByChild('timestamp'), window.firebase.limitToLast(100));
            
            window.firebase.onValue(chatQuery, (snapshot) => {
                const messages = [];
                let lastMessageId = null;
                
                snapshot.forEach((childSnapshot) => {
                    const message = {
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    };
                    messages.push(message);
                    lastMessageId = childSnapshot.key;
                });
                
                // Check for new messages
                const newMessages = messages.filter(msg => {
                    // Check if message is new (after last read)
                    if (this.lastReadMessageId) {
                        const lastReadIndex = messages.findIndex(m => m.id === this.lastReadMessageId);
                        const currentIndex = messages.findIndex(m => m.id === msg.id);
                        return currentIndex > lastReadIndex && msg.userId !== this.firebaseUser?.uid;
                    }
                    return !this.chatMessages.find(m => m.id === msg.id) && msg.userId !== this.firebaseUser?.uid;
                });
                
                if (newMessages.length > 0 && !document.getElementById('globalChat').classList.contains('active')) {
                    this.unreadMessages = newMessages.length;
                    this.updateChatBadge();
                    
                    // Show notification for new messages
                    if (this.shouldShowNotification('chat')) {
                        const lastMessage = newMessages[newMessages.length - 1];
                        this.showNotification(`${lastMessage.userName}: ${lastMessage.content.substring(0, 50)}...`, 'info');
                        
                        // Push notification
                        if (this.settings.pushNotifications) {
                            this.sendPushNotification(`Nowa wiadomość od ${lastMessage.userName}`, lastMessage.content);
                        }
                    }
                }
                
                this.chatMessages = messages;
                this.displayChatMessages();
                
                // Mark messages as read if chat is open
                if (document.getElementById('globalChat').classList.contains('active') && lastMessageId) {
                    this.lastReadMessageId = lastMessageId;
                    localStorage.setItem(`lastReadMessage_${this.firebaseUser?.uid}`, lastMessageId);
                    
                    // Mark all visible messages as read
                    messages.forEach(msg => {
                        if (msg.userId !== this.firebaseUser?.uid) {
                            this.markMessageAsRead(msg.id);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error listening to chat:', error);
        }
    }
    
    shouldShowNotification(type) {
        if (!this.settings.notifications) return false;
        
        if (this.settings.mutedUntil) {
            if (this.settings.mutedUntil === 'forever') return false;
            
            const mutedUntil = new Date(this.settings.mutedUntil);
            if (new Date() < mutedUntil) return false;
        }
        
        if (type === 'chat' && !this.settings.chatNotifications) return false;
        if (type === 'timer' && !this.settings.timerNotifications) return false;
        
        return true;
    }
    
    sendPushNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                vibrate: [200, 100, 200]
            });
        }
    }
    
    displayChatMessages() {
        const container = document.getElementById('chatMessages');
        
        if (this.chatMessages.length === 0) {
            container.innerHTML = `
                <div class="chat-welcome">
                    <i class="fas fa-comments"></i>
                    <p>Witaj w czacie globalnym!</p>
                    <p class="text-muted">Rozpocznij rozmowę z innymi użytkownikami</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.chatMessages.map(msg => {
            const isOwn = msg.userId === this.firebaseUser?.uid;
            const date = new Date(msg.timestamp);
            const time = date.toLocaleTimeString(this.settings.region, { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: this.settings.timeFormat === '12h'
            });
            
            if (msg.type === 'system') {
                return `
                    <div class="chat-message system">
                        <div class="message-content">${msg.content}</div>
                    </div>
                `;
            }
            
            // Get read receipts for this message
            const readers = this.messageReads[msg.id] || [];
            const readByOthers = readers.filter(r => r.userId !== msg.userId);
            
            let readReceiptHtml = '';
            if (isOwn && this.settings.showReadReceipts) {
                if (readByOthers.length > 0) {
                    readReceiptHtml = `<span class="read-receipt read" title="Przeczytane przez ${readByOthers.length} osobę(y)">
                        <i class="fas fa-check-double"></i>
                    </span>`;
                } else {
                    readReceiptHtml = `<span class="read-receipt unread" title="Nieprzeczytane">
                        <i class="fas fa-check-double"></i>
                    </span>`;
                }
            }
            
            return `
                <div class="chat-message ${isOwn ? 'own' : ''}" data-message-id="${msg.id}">
                    <div class="message-header">
                        <span class="message-author">${this.escapeHtml(msg.userName)}</span>
                        <span class="message-time">${time}</span>
                    </div>
                    <div class="message-content">
                        ${msg.content}
                        ${readReceiptHtml}
                    </div>
                </div>
            `;
        }).join('');
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }
    
    async deleteMessage(messageId) {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        // Find the message
        const message = this.chatMessages.find(m => m.id === messageId);
        if (!message || message.userId !== this.firebaseUser.uid) {
            this.showNotification('Możesz usuwać tylko swoje wiadomości!', 'error');
            return;
        }
        
        if (confirm('Czy na pewno chcesz usunąć tę wiadomość?')) {
            try {
                const messageRef = window.firebase.ref(window.firebase.database, `chat/messages/${messageId}`);
                await window.firebase.remove(messageRef);
                
                // Also remove read receipts
                const readsRef = window.firebase.ref(window.firebase.database, `chat/reads/${messageId}`);
                await window.firebase.remove(readsRef);
                
                this.showNotification('Wiadomość została usunięta', 'success');
            } catch (error) {
                console.error('Error deleting message:', error);
                this.showNotification('Błąd podczas usuwania wiadomości', 'error');
            }
        }
    }
    
    copyMessage(messageId) {
        const message = this.chatMessages.find(m => m.id === messageId);
        if (!message) return;
        
        // Remove HTML tags for copying
        const textContent = message.content.replace(/<[^>]*>/g, '');
        
        navigator.clipboard.writeText(textContent).then(() => {
            this.showNotification('Wiadomość skopiowana!', 'success');
        }).catch(err => {
            console.error('Error copying message:', err);
            this.showNotification('Błąd kopiowania wiadomości', 'error');
        });
    }
    
    async sendMessage(event) {
        event.preventDefault();
        
        const input = document.getElementById('chatInput');
        const content = input.value.trim();
        
        if (!content || content.length > 500) return;
        
        // Clear input immediately for better UX
        input.value = '';
        
        // Ensure we have Firebase user
        if (!this.firebaseUser && this.isFirebaseReady) {
            console.log('No Firebase user, creating one...');
            const success = await this.createAnonymousUser();
            if (!success) {
                this.showNotification('Błąd połączenia z czatem. Spróbuj ponownie.', 'error');
                return;
            }
        }
        
        // Create message object
        const message = {
            userId: this.firebaseUser?.uid || 'anonymous_' + Date.now(),
            userName: this.currentUser.name,
            userPicture: this.customAvatar || this.currentUser.picture,
            content: this.escapeHtml(content),
            timestamp: Date.now(),
            type: 'user'
        };
        
        try {
            if (!this.firebaseUser) {
                throw new Error('No Firebase user available');
            }
            
            // Send to Firebase
            const chatRef = window.firebase.ref(window.firebase.database, 'chat/messages');
            const result = await window.firebase.push(chatRef, message);
            console.log('Message sent successfully, key:', result.key);
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Show message locally
            this.chatMessages.push({
                id: 'local_' + Date.now(),
                ...message
            });
            this.displayChatMessages();
            this.showNotification('Wiadomość wysłana lokalnie (brak połączenia z serwerem)', 'warning');
        }
    }
    
    async toggleChat() {
        const chat = document.getElementById('globalChat');
        chat.classList.toggle('active');
        
        if (chat.classList.contains('active')) {
            this.unreadMessages = 0;
            this.updateChatBadge();
            document.getElementById('chatInput').focus();
            
            // Mark last message as read
            if (this.chatMessages.length > 0) {
                const lastMessage = this.chatMessages[this.chatMessages.length - 1];
                this.lastReadMessageId = lastMessage.id;
                localStorage.setItem(`lastReadMessage_${this.firebaseUser?.uid}`, lastMessage.id);
                
                // Mark all messages as read
                this.chatMessages.forEach(msg => {
                    if (msg.userId !== this.firebaseUser?.uid) {
                        this.markMessageAsRead(msg.id);
                    }
                });
            }
            
            // Ensure Firebase connection when opening chat
            if (this.isFirebaseReady && !this.firebaseUser && this.currentUser) {
                console.log('Chat opened, creating Firebase user...');
                await this.createAnonymousUser();
            }
        }
    }
    
    updateChatBadge() {
        const badge = document.getElementById('chatBadge');
        if (this.unreadMessages > 0) {
            badge.textContent = this.unreadMessages > 99 ? '99+' : this.unreadMessages;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
    
    updateOnlineUsers() {
        if (!this.isFirebaseReady) return;
        
        try {
            const presenceRef = window.firebase.ref(window.firebase.database, 'presence');
            
            window.firebase.onValue(presenceRef, (snapshot) => {
                let onlineCount = 0;
                snapshot.forEach((childSnapshot) => {
                    const presence = childSnapshot.val();
                    if (presence.state === 'online') {
                        onlineCount++;
                    }
                });
                
                document.getElementById('onlineCount').textContent = onlineCount;
            });
        } catch (error) {
            console.error('Error updating online users:', error);
        }
    }
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    async showApp() {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('loadingScreen').style.display = 'flex';
        
        // Small delay to ensure DOM is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        document.querySelector('.container').style.display = 'block';
        
        // Set user data in UI
        document.getElementById('userName').textContent = this.currentUser.name;
        document.getElementById('userAvatar').src = this.currentUser.picture;
        document.getElementById('welcomeName').textContent = this.currentUser.name.split(' ')[0];
        
        // Load custom avatar if exists
        this.loadCustomAvatar();
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 2500);
        
        // Update current time
        this.updateCurrentTime();
        setInterval(() => this.updateCurrentTime(), 1000);
        
        // Update stats
        this.updateStats();
        
        // Load theme
        this.loadTheme();
        
        // Apply settings
        this.applySettings();
        
        // Check for active timers
        this.checkActiveTimers();
        
        // Load user data
        this.loadUserDataFromLocalStorage();
        
        // Ensure Firebase connection after app loads
        if (this.isFirebaseReady && !this.firebaseUser) {
            setTimeout(async () => {
                console.log('App loaded, creating Firebase user...');
                await this.createAnonymousUser();
            }, 1000);
        }
    }
    
    logout() {
        if (confirm('Czy na pewno chcesz się wylogować?')) {
            // Stop timers
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
            
            // Sign out from Firebase
            if (this.firebaseUser && this.isFirebaseReady) {
                window.firebase.auth.signOut().catch(error => {
                    console.error('Firebase signout error:', error);
                });
            }
            
            // Clear presence
            if (this.presenceRef && this.isFirebaseReady) {
                window.firebase.set(this.presenceRef, {
                    state: 'offline',
                    last_changed: window.firebase.serverTimestamp()
                }).catch(error => {
                    console.error('Error setting offline presence:', error);
                });
            }
            
            // Clear local data
            localStorage.removeItem('currentUser');
            localStorage.removeItem('pendingGoogleLogin');
            
            // Clear session timeout
            if (this.sessionTimeout) {
                clearTimeout(this.sessionTimeout);
            }
            
            // Reload page
            location.reload();
        }
    }
    
    // Storage methods
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    }
    
    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return null;
        }
    }
    
    // Theme methods
    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#themeToggle i');
        
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.querySelector('#themeToggle i').classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    // Navigation methods
    showMainMenu() {
        document.getElementById('mainMenu').style.display = 'block';
        document.getElementById('teamsMode').style.display = 'none';
        document.getElementById('youtubeMode').style.display = 'none';
    }
    
    showTeamsMode() {
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('teamsMode').style.display = 'block';
        document.getElementById('youtubeMode').style.display = 'none';
        this.loadUpcomingMeetings();
        this.loadMeetingsHistory();
        this.loadFavoriteMeetings();
    }
    
    showYouTubeMode() {
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('teamsMode').style.display = 'none';
        document.getElementById('youtubeMode').style.display = 'block';
        this.loadFavoriteChannels();
        this.loadWatchHistory();
    }
    
    // Teams tab navigation
    showTeamsTab(tabName, event) {
        if (event) event.preventDefault();
        
        // Hide all tabs
        document.querySelectorAll('#teamsMode .tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.teams-tabs .tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(`${tabName}Tab`).style.display = 'block';
        
        // Add active class to clicked tab
        if (event && event.target) {
            event.target.closest('.tab').classList.add('active');
        }
    }
    
    // YouTube tab navigation
    showYouTubeTab(tabName, event) {
        if (event) event.preventDefault();
        
        // Hide all tabs
        document.querySelectorAll('#youtubeMode .tab-content').forEach(tab => {
            tab.style.display = 'none';
        });
        
        // Remove active class from all tabs
        document.querySelectorAll('.youtube-tabs .tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Show selected tab
        if (tabName === 'favorites') {
            document.getElementById('favoritesTabYT').style.display = 'block';
        } else if (tabName === 'history') {
            document.getElementById('historyTabYT').style.display = 'block';
        } else {
            document.getElementById(`${tabName}Tab`).style.display = 'block';
        }
        
        // Add active class to clicked tab
        if (event && event.target) {
            event.target.closest('.tab').classList.add('active');
        }
    }
    
    // Teams functionality
    async handleTeamsSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('meetingTitle').value || 'Spotkanie Teams';
        const link = document.getElementById('meetingLink').value;
        const date = document.getElementById('meetingDate').value;
        const time = document.getElementById('meetingTime').value;
        const duration = parseInt(document.getElementById('meetingDuration').value);
        const autoOpen = document.getElementById('autoOpenTeams').checked;
        const addToFavorites = document.getElementById('addToFavorites').checked;
        
        const meetingDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        
        // Check if meeting time is very close (within 2 minutes)
        const timeUntilMeeting = meetingDateTime - now;
        const twoMinutes = 2 * 60 * 1000;
        
        if (timeUntilMeeting < 0) {
            this.showNotification('Spotkanie nie może być w przeszłości!', 'error');
            return;
        }
        
        // Create meeting object
        const meeting = {
            id: Date.now(),
            title,
            link,
            dateTime: meetingDateTime.toISOString(),
            duration,
            autoOpen,
            addedAt: new Date().toISOString()
        };
        
        // Save meeting
        this.meetings.push(meeting);
        await this.saveUserData('meetings', this.meetings);
        
        // Add to favorites if requested
        if (addToFavorites) {
            await this.addToFavoriteMeetings(meeting);
        }
        
        // Add to history
        await this.addToMeetingsHistory(meeting);
        
        // Start timer
        this.startTimer('teams', meetingDateTime, duration, link, autoOpen, title);
        
        // Show notification with timer info
        if (timeUntilMeeting <= twoMinutes && autoOpen) {
            this.showNotification('Timer ustawiony! Spotkanie otworzy się automatycznie.', 'success');
            
            // Open immediately if within 2 minutes
            window.open(link, '_blank');
        } else {
            this.showNotification('Timer ustawiony dla spotkania Teams!', 'success');
        }
        
        // Reset form and go back to main menu
        e.target.reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('meetingDate').value = today;
        
        // Show active timer notification
        document.getElementById('activeTimerNotification').style.display = 'block';
        document.getElementById('activeTimerText').textContent = `Odliczanie: ${title}`;
        
        // Go back to main menu
        setTimeout(() => this.showMainMenu(), 1000);
    }
    
    async addToFavoriteMeetings(meeting) {
        const favMeeting = {
            ...meeting,
            id: 'fav_' + Date.now()
        };
        
        this.favoriteMeetings.push(favMeeting);
        await this.saveUserData('favoriteMeetings', this.favoriteMeetings);
        this.loadFavoriteMeetings();
    }
    
    loadFavoriteMeetings() {
        const container = document.getElementById('favoriteMeetings');
        
        if (this.favoriteMeetings.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak ulubionych spotkań</p>';
            return;
        }
        
        container.innerHTML = this.favoriteMeetings.map(meeting => {
            return `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${this.escapeHtml(meeting.title)}</h4>
                        <div class="history-meta">
                            <span><i class="fas fa-link"></i> Teams</span>
                            <span><i class="fas fa-hourglass"></i> ${meeting.duration} min</span>
                        </div>
                    </div>
                    <div class="history-actions">
                        <button onclick="window.app.startQuickMeeting('${meeting.link}', ${meeting.duration}, '${this.escapeHtml(meeting.title)}')">
                            <i class="fas fa-play"></i> Szybki start
                        </button>
                        <button onclick="window.app.removeFavoriteMeeting('${meeting.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    async removeFavoriteMeeting(id) {
        this.favoriteMeetings = this.favoriteMeetings.filter(m => m.id !== id);
        await this.saveUserData('favoriteMeetings', this.favoriteMeetings);
        this.loadFavoriteMeetings();
        this.showNotification('Spotkanie usunięte z ulubionych', 'success');
    }
    
    startQuickMeeting(link, duration, title) {
        // Start meeting in 5 minutes
        const startTime = new Date();
        startTime.setMinutes(startTime.getMinutes() + 5);
        
        this.startTimer('teams', startTime, duration, link, true, title);
        this.showNotification('Timer ustawiony - spotkanie za 5 minut!', 'success');
        
        // Show active timer notification
        document.getElementById('activeTimerNotification').style.display = 'block';
        document.getElementById('activeTimerText').textContent = `Odliczanie: ${title}`;
    }
    
    showAddUpcomingMeeting() {
        const title = prompt('Tytuł spotkania:');
        if (!title) return;
        
        const link = prompt('Link do spotkania Teams:');
        if (!link) return;
        
        const dateStr = prompt('Data spotkania (RRRR-MM-DD):');
        if (!dateStr) return;
        
        const timeStr = prompt('Godzina spotkania (GG:MM):');
        if (!timeStr) return;
        
        const duration = prompt('Czas trwania (minuty):', '60');
        if (!duration) return;
        
        const meetingDateTime = new Date(`${dateStr}T${timeStr}`);
        
        if (meetingDateTime < new Date()) {
            this.showNotification('Spotkanie nie może być w przeszłości!', 'error');
            return;
        }
        
        const meeting = {
            id: Date.now(),
            title,
            link,
            dateTime: meetingDateTime.toISOString(),
            duration: parseInt(duration),
            autoOpen: true,
            addedAt: new Date().toISOString()
        };
        
        this.meetings.push(meeting);
        this.saveUserData('meetings', this.meetings);
        this.loadUpcomingMeetings();
        this.showNotification('Spotkanie dodane!', 'success');
    }
    
    async addToMeetingsHistory(meeting) {
        const historyEntry = {
            ...meeting,
            completedAt: new Date().toISOString()
        };
        
        this.meetingsHistory.unshift(historyEntry);
        if (this.meetingsHistory.length > 50) {
            this.meetingsHistory = this.meetingsHistory.slice(0, 50);
        }
        
        await this.saveUserData('meetingsHistory', this.meetingsHistory);
        this.loadMeetingsHistory();
    }
    
    loadMeetingsHistory() {
        const container = document.getElementById('meetingsHistory');
        
        if (this.meetingsHistory.length === 0) {
            container.innerHTML = '<p class="empty-state">Historia jest pusta</p>';
            return;
        }
        
        const recentHistory = this.meetingsHistory.slice(0, 20);
        
        container.innerHTML = recentHistory.map(meeting => {
            const meetingDate = new Date(meeting.dateTime);
            const addedDate = new Date(meeting.addedAt);
            
            return `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${this.escapeHtml(meeting.title)}</h4>
                        <div class="history-meta">
                            <span><i class="fas fa-calendar"></i> ${meetingDate.toLocaleDateString(this.settings.region)}</span>
                            <span><i class="fas fa-clock"></i> ${meetingDate.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}</span>
                            <span><i class="fas fa-hourglass"></i> ${meeting.duration} min</span>
                        </div>
                        <div class="history-meta" style="margin-top: 0.5rem;">
                            <span style="color: var(--text-muted);"><i class="fas fa-plus-circle"></i> Dodano: ${addedDate.toLocaleDateString(this.settings.region)} ${addedDate.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                    </div>
                    <div class="history-actions">
                        <button onclick="window.open('${meeting.link}', '_blank')">
                            <i class="fas fa-external-link-alt"></i> Otwórz
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    async clearMeetingsHistory() {
        if (confirm('Czy na pewno chcesz wyczyścić całą historię spotkań?')) {
            this.meetingsHistory = [];
            await this.saveUserData('meetingsHistory', this.meetingsHistory);
            this.loadMeetingsHistory();
            this.showNotification('Historia spotkań wyczyszczona', 'success');
        }
    }
    
    loadUpcomingMeetings() {
        const container = document.getElementById('upcomingMeetings');
        const now = new Date();
        
        // Filter future meetings
        const upcomingMeetings = this.meetings
            .filter(m => new Date(m.dateTime) > now)
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            .slice(0, 10);
        
        if (upcomingMeetings.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak zaplanowanych spotkań</p>';
            return;
        }
        
        container.innerHTML = upcomingMeetings.map(meeting => {
            const meetingDate = new Date(meeting.dateTime);
            return `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${this.escapeHtml(meeting.title)}</h4>
                        <div class="history-meta">
                            <span><i class="fas fa-calendar"></i> ${meetingDate.toLocaleDateString(this.settings.region)}</span>
                            <span><i class="fas fa-clock"></i> ${meetingDate.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}</span>
                            <span><i class="fas fa-hourglass"></i> ${meeting.duration} min</span>
                        </div>
                    </div>
                    <div class="history-actions">
                        <button onclick="window.app.startMeetingTimer(${meeting.id})">
                            <i class="fas fa-play"></i> Start
                        </button>
                        <button onclick="window.app.deleteMeeting(${meeting.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    startMeetingTimer(id) {
        const meeting = this.meetings.find(m => m.id === id);
        if (meeting) {
            const meetingDateTime = new Date(meeting.dateTime);
            this.startTimer('teams', meetingDateTime, meeting.duration, meeting.link, meeting.autoOpen, meeting.title);
            
            // Show active timer notification
            document.getElementById('activeTimerNotification').style.display = 'block';
            document.getElementById('activeTimerText').textContent = `Odliczanie: ${meeting.title}`;
        }
    }
    
    async deleteMeeting(id) {
        this.meetings = this.meetings.filter(m => m.id !== id);
        await this.saveUserData('meetings', this.meetings);
        this.loadUpcomingMeetings();
        this.updateStats();
        this.showNotification('Spotkanie usunięte', 'success');
    }
    
    // YouTube functionality
    async handleYouTubeSubmit(e) {
        e.preventDefault();
        
        const url = document.getElementById('videoUrl').value;
        const date = document.getElementById('videoDate').value;
        const time = document.getElementById('videoTime').value;
        const duration = parseInt(document.getElementById('videoDuration').value);
        
        const videoDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        
        // Check if video time is very close (within 1 minute)
        const timeUntilVideo = videoDateTime - now;
        const oneMinute = 60 * 1000;
        
        if (timeUntilVideo < 0) {
            this.showNotification('Film nie może być zaplanowany w przeszłości!', 'error');
            return;
        }
        
        // Extract video ID and title
        const videoId = this.extractVideoId(url);
        const title = `Film YouTube - ${videoId}`;
        
        // Start timer
        this.startTimer('youtube', videoDateTime, duration, url, true, title);
        
        // Show notification with timer info
        if (timeUntilVideo <= oneMinute) {
            this.showNotification('Timer ustawiony! Film otworzy się automatycznie.', 'success');
            
            // Open immediately if within 1 minute
            window.open(url, '_blank');
            
            // Add to watch history
            await this.addToWatchHistory({
                title,
                url,
                watchedAt: new Date().toISOString()
            });
        } else {
            this.showNotification('Timer ustawiony dla filmu YouTube!', 'success');
        }
        
        // Reset form and go back to main menu
        e.target.reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('videoDate').value = today;
        
        // Show active timer notification
        document.getElementById('activeTimerNotification').style.display = 'block';
        document.getElementById('activeTimerText').textContent = `Odliczanie: ${title}`;
        
        // Go back to main menu
        setTimeout(() => this.showMainMenu(), 1000);
    }
    
    extractVideoId(url) {
        const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        return match ? match[1] : 'unknown';
    }
    
    setSearchType(button) {
        document.querySelectorAll('.search-type').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }
    
    searchYouTube() {
        const query = document.getElementById('youtubeSearch').value;
        const searchType = document.querySelector('.search-type.active').dataset.type;
        
        if (!query) {
            this.showNotification('Wpisz frazę do wyszukania', 'warning');
            return;
        }
        
        // Redirect to YouTube
        this.redirectToYouTube(query, searchType);
        
        // Clear search input
        document.getElementById('youtubeSearch').value = '';
    }
    
    redirectToYouTube(query, type) {
        let searchUrl = '';
        const encodedQuery = encodeURIComponent(query);
        
        if (type === 'video') {
            searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;
        } else if (type === 'channel') {
            searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}&sp=EgIQAg%253D%253D`;
        } else if (type === 'playlist') {
            searchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}&sp=EgIQAw%253D%253D`;
        }
        
        window.open(searchUrl, '_blank');
    }
    
    showAddFavorite() {
        const channelName = prompt('Podaj nazwę kanału:');
        if (channelName) {
            const channelId = 'manual_' + Date.now();
            this.addToFavorites(channelId, channelName, 0);
            this.loadFavoriteChannels();
        }
    }
    
    async addToFavorites(id, name, subscribers) {
        if (this.favoriteChannels[id]) {
            this.showNotification('Kanał jest już w ulubionych!', 'warning');
            return;
        }
        
        this.favoriteChannels[id] = {
            name,
            subscribers,
            addedAt: new Date().toISOString()
        };
        
        await this.saveUserData('favoriteChannels', this.favoriteChannels);
        this.updateStats();
        this.showNotification(`Dodano "${name}" do ulubionych!`, 'success');
    }
    
    loadFavoriteChannels() {
        const container = document.getElementById('favoriteChannelsList');
        const channels = Object.entries(this.favoriteChannels);
        
        if (channels.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak ulubionych kanałów</p>';
            return;
        }
        
        container.innerHTML = channels.map(([id, channel]) => `
            <div class="channel-card" onclick="window.app.openChannel('${id}', '${this.escapeHtml(channel.name)}')">
                <div class="channel-avatar">
                    <i class="fas fa-tv"></i>
                </div>
                <div class="channel-name">${this.escapeHtml(channel.name)}</div>
                <div class="channel-stats">
                    ${channel.subscribers ? this.formatNumber(channel.subscribers) + ' subskrybentów' : 'Kanał niestandardowy'}
                </div>
                <button class="remove-favorite" onclick="event.stopPropagation(); window.app.removeFavorite('${id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    openChannel(channelId, channelName) {
        let url;
        if (channelId.startsWith('manual_')) {
            // For manually added channels, search on YouTube
            url = `https://www.youtube.com/results?search_query=${encodeURIComponent(channelName)}`;
        } else {
            url = `https://youtube.com/channel/${channelId}`;
        }
        
        window.open(url, '_blank');
    }
    
    async removeFavorite(channelId) {
        const channel = this.favoriteChannels[channelId];
        if (confirm(`Czy na pewno chcesz usunąć "${channel.name}" z ulubionych?`)) {
            delete this.favoriteChannels[channelId];
            await this.saveUserData('favoriteChannels', this.favoriteChannels);
            this.loadFavoriteChannels();
            this.updateStats();
            this.showNotification('Kanał usunięty z ulubionych', 'success');
        }
    }
    
    async addToWatchHistory(video) {
        this.watchHistory.unshift(video);
        if (this.watchHistory.length > 100) {
            this.watchHistory = this.watchHistory.slice(0, 100);
        }
        await this.saveUserData('watchHistory', this.watchHistory);
        this.loadWatchHistory();
        this.updateStats();
    }
    
    loadWatchHistory() {
        const container = document.getElementById('watchHistory');
        
        if (this.watchHistory.length === 0) {
            container.innerHTML = '<p class="empty-state">Historia jest pusta</p>';
            return;
        }
        
        const recentHistory = this.watchHistory.slice(0, 10);
        
        container.innerHTML = recentHistory.map(video => {
            const watchedDate = new Date(video.watchedAt);
            return `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${this.escapeHtml(video.title)}</h4>
                        <div class="history-meta">
                            <span><i class="fas fa-calendar"></i> ${watchedDate.toLocaleDateString(this.settings.region)}</span>
                            <span><i class="fas fa-clock"></i> ${watchedDate.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                    </div>
                    <div class="history-actions">
                        <button onclick="window.app.openVideo('${video.url}', '${this.escapeHtml(video.title)}')">
                            <i class="fas fa-play"></i> Oglądaj
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    async openVideo(url, title) {
        // Add to history
        await this.addToWatchHistory({
            title,
            url,
            watchedAt: new Date().toISOString()
        });
        
        // Open video
        window.open(url, '_blank');
    }
    
    async clearHistory() {
        if (confirm('Czy na pewno chcesz wyczyścić całą historię oglądania?')) {
            this.watchHistory = [];
            await this.saveUserData('watchHistory', this.watchHistory);
            this.loadWatchHistory();
            this.updateStats();
            this.showNotification('Historia wyczyszczona', 'success');
        }
    }
    
    // Timer functionality
    startTimer(type, startTime, duration, url, autoOpen, title = '') {
        this.currentTimer = {
            type,
            startTime,
            endTime: new Date(startTime.getTime() + duration * 60000),
            duration,
            url,
            autoOpen,
            title: title || (type === 'teams' ? 'Spotkanie Teams' : 'Film YouTube'),
            status: 'waiting',
            notified2min: false,
            notified5min: false,
            opened: false
        };
        
        // Show timer display
        document.getElementById('timerDisplay').style.display = 'flex';
        
        // Update timer icon
        const iconElement = document.getElementById('timerIcon');
        if (type === 'teams') {
            iconElement.innerHTML = '<i class="fas fa-users"></i>';
        } else {
            iconElement.innerHTML = '<i class="fab fa-youtube" style="color: #ff0000;"></i>';
        }
        
        // Set title
        document.getElementById('timerTitle').textContent = this.currentTimer.title;
        
        // Start timer interval
        this.timerInterval = setInterval(() => this.updateTimer(), 100);
        
        // Save current timer state
        this.saveToStorage('activeTimer', this.currentTimer);
        
        // Add to history if teams meeting
        if (type === 'teams') {
            const meeting = {
                title: this.currentTimer.title,
                link: url,
                dateTime: startTime.toISOString(),
                duration: duration,
                autoOpen: autoOpen,
                addedAt: new Date().toISOString()
            };
            this.addToMeetingsHistory(meeting);
        }
    }
    
    updateTimer() {
        if (!this.currentTimer || this.isPaused) return;
        
        const now = new Date();
        const startTime = new Date(this.currentTimer.startTime);
        const endTime = this.currentTimer.endTime;
        
        // Calculate times
        let timeToStart = startTime - now;
        let timeToEnd = endTime - now;
        let elapsed = now - startTime;
        
        // Update status
        if (now < startTime) {
            this.currentTimer.status = 'waiting';
            document.getElementById('timerSubtitle').textContent = 'Rozpoczęcie za...';
            this.displayTime(timeToStart);
            
            // Check for 2-minute warning
            if (timeToStart <= 120000 && !this.currentTimer.notified2min) {
                this.currentTimer.notified2min = true;
                if (this.shouldShowNotification('timer')) {
                    this.showNotification(`${this.currentTimer.type === 'teams' ? 'Spotkanie' : 'Film'} rozpocznie się za 2 minuty!`, 'warning');
                    
                    if (this.settings.pushNotifications) {
                        this.sendPushNotification(
                            'Zbliża się wydarzenie!',
                            `${this.currentTimer.title} rozpocznie się za 2 minuty`
                        );
                    }
                }
                
                // Show active timer notification
                document.getElementById('activeTimerNotification').style.display = 'block';
                
                // Auto open 2 minutes before for Teams
                if (this.currentTimer.type === 'teams' && this.currentTimer.autoOpen && !this.currentTimer.opened) {
                    this.currentTimer.opened = true;
                    this.openTimerLink();
                }
            }
            
            // Auto open 1 minute before for YouTube
            if (this.currentTimer.type === 'youtube' && timeToStart <= 60000 && this.currentTimer.autoOpen && !this.currentTimer.opened) {
                this.currentTimer.opened = true;
                this.openTimerLink();
            }
        } else if (now < endTime) {
            this.currentTimer.status = 'active';
            document.getElementById('timerSubtitle').textContent = 'Pozostało...';
            this.displayTime(timeToEnd);
            
            // Update progress bar
            const progress = (elapsed / (this.currentTimer.duration * 60000)) * 100;
            document.getElementById('progressFill').style.width = `${progress}%`;
            
            // Check for 5-minute warning
            if (timeToEnd <= 300000 && !this.currentTimer.notified5min) {
                this.currentTimer.notified5min = true;
                if (this.shouldShowNotification('timer')) {
                    this.showNotification('Pozostało 5 minut!', 'warning');
                }
            }
        } else {
            this.currentTimer.status = 'ended';
            document.getElementById('timerSubtitle').textContent = 'Zakończone!';
            this.displayTime(0);
            
            // Stop timer
            clearInterval(this.timerInterval);
            if (this.shouldShowNotification('timer')) {
                this.showNotification('Timer zakończony!', 'success');
            }
            
            // Update stats
            if (this.currentTimer.type === 'teams') {
                const todayMeetings = parseInt(document.getElementById('totalMeetings').textContent);
                document.getElementById('totalMeetings').textContent = todayMeetings + 1;
            } else {
                const totalVideos = parseInt(document.getElementById('totalVideos').textContent);
                document.getElementById('totalVideos').textContent = totalVideos + 1;
            }
            
            // Clear saved timer
            localStorage.removeItem('activeTimer');
            
            // Hide active timer notification
            document.getElementById('activeTimerNotification').style.display = 'none';
            
            // Auto close after 5 seconds
            setTimeout(() => this.closeTimer(), 5000);
        }
        
        // Update progress info
        document.getElementById('progressStart').textContent = startTime.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'});
        document.getElementById('progressEnd').textContent = endTime.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'});
    }
    
    displayTime(milliseconds) {
        const total = Math.max(0, Math.floor(milliseconds / 1000));
        const days = Math.floor(total / 86400);
        const hours = Math.floor((total % 86400) / 3600);
        const minutes = Math.floor((total % 3600) / 60);
        const seconds = total % 60;
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    async openTimerLink() {
        if (this.currentTimer && this.currentTimer.url) {
            window.open(this.currentTimer.url, '_blank');
            
            // Add to history if YouTube
            if (this.currentTimer.type === 'youtube') {
                await this.addToWatchHistory({
                    title: this.currentTimer.title,
                    url: this.currentTimer.url,
                    watchedAt: new Date().toISOString()
                });
            }
        }
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (this.isPaused) {
            pauseBtn.innerHTML = '<i class="fas fa-play"></i> Wznów';
            this.showNotification('Timer wstrzymany', 'info');
        } else {
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pauza';
            this.showNotification('Timer wznowiony', 'info');
        }
    }
    
    stopTimer() {
        if (confirm('Czy na pewno chcesz zatrzymać timer?')) {
            clearInterval(this.timerInterval);
            this.currentTimer = null;
            this.isPaused = false;
            localStorage.removeItem('activeTimer');
            document.getElementById('activeTimerNotification').style.display = 'none';
            this.closeTimer();
            this.showNotification('Timer zatrzymany', 'info');
        }
    }
    
    closeTimer() {
        document.getElementById('timerDisplay').style.display = 'none';
        if (!this.currentTimer || this.currentTimer.status === 'ended') {
            clearInterval(this.timerInterval);
            this.currentTimer = null;
            this.isPaused = false;
            localStorage.removeItem('activeTimer');
            document.getElementById('activeTimerNotification').style.display = 'none';
        }
    }
    
    showTimer() {
        if (this.currentTimer) {
            document.getElementById('timerDisplay').style.display = 'flex';
        }
    }
    
    checkActiveTimers() {
        const savedTimer = this.loadFromStorage('activeTimer');
        if (savedTimer) {
            const now = new Date();
            const endTime = new Date(savedTimer.endTime);
            
            if (endTime > now) {
                // Restore timer
                this.currentTimer = savedTimer;
                this.currentTimer.startTime = new Date(savedTimer.startTime);
                this.currentTimer.endTime = new Date(savedTimer.endTime);
                
                // Restart timer
                this.startTimer(
                    savedTimer.type,
                    this.currentTimer.startTime,
                    savedTimer.duration,
                    savedTimer.url,
                    savedTimer.autoOpen,
                    savedTimer.title
                );
                
                this.showNotification('Przywrócono aktywny timer', 'info');
            } else {
                // Timer expired, remove it
                localStorage.removeItem('activeTimer');
            }
        }
    }
    
    // Utility methods
    updateCurrentTime() {
        const now = new Date();
        
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: this.settings.timeFormat === '12h'
        };
        
        const dateOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        
        const timeString = now.toLocaleTimeString(this.settings.region, timeOptions);
        const dateString = now.toLocaleDateString(this.settings.region, dateOptions);
        
        document.getElementById('currentTime').innerHTML = `
            ${timeString}<br>
            <span style="font-size: 0.8em; opacity: 0.8;">${dateString}</span>
        `;
    }
    
    updateStats() {
        // Count today's meetings
        const today = new Date().toDateString();
        const todayMeetings = this.meetings.filter(m => 
            new Date(m.dateTime).toDateString() === today
        ).length;
        
        document.getElementById('totalMeetings').textContent = todayMeetings;
        document.getElementById('totalVideos').textContent = this.watchHistory.length;
        document.getElementById('favoriteChannels').textContent = Object.keys(this.favoriteChannels).length;
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    showNotification(message, type = 'info') {
        if (!this.shouldShowNotification(type === 'info' ? 'general' : type)) {
            return;
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        }[type];
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${this.escapeHtml(message)}</span>
        `;
        
        const container = document.getElementById('notifications');
        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide login screen by default
    document.getElementById('loginScreen').style.display = 'none';
    
    // Create app instance
    window.app = new TimerHub();
});

// Prevent closing tab with active timer
window.addEventListener('beforeunload', (e) => {
    if (window.app && window.app.currentTimer) {
        e.preventDefault();
        e.returnValue = 'Masz aktywny timer. Czy na pewno chcesz opuścić stronę?';
    }
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}