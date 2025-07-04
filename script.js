// Timer Hub Pro Application - Enhanced Version
class TimerHub {
    constructor() {
        // Core properties
        this.currentTimer = null;
        this.timerInterval = null;
        this.watchHistory = [];
        this.favoriteChannels = {};
        this.meetings = [];
        this.meetingsHistory = [];
        this.favoriteMeetings = [];
        this.recurringMeetings = [];
        this.youtubeMode = 'normal';
        this.isPaused = false;
        this.currentUser = null;
        this.firebaseUser = null;
        this.chatMessages = [];
        this.privateMessages = {};
        this.chatRooms = {};
        this.currentRoom = 'global';
        this.unreadMessages = 0;
        this.unreadPrivateMessages = 0;
        this.isFirebaseReady = false;
        this.presenceRef = null;
        this.lastReadMessageId = null;
        this.messageReads = {};
        this.selectedMessageId = null;
        this.currentPrivateChat = null;
        this.onlineUsers = {};
        this.allUsers = {};
        this.processedUsers = new Set();
        this.customAvatar = null;
        this.tags = {};
        this.playlists = {};
        this.notes = {};
        this.currentNoteType = 'before';
        this.recentActivity = [];
        this.searchHistory = [];
        this.typingTimeout = null;
        this.typingUsers = {};
        this.pomodoroTimer = null;
        this.pomodoroInterval = null;
        this.pomodoroSessions = 0;
        this.isWorkSession = true;
        this.autoBreakTimeout = null;
        this.aiMessages = [];
        this.tasks = [];
        this.goals = {};
        this.achievements = {};
        this.userStats = {
            points: 0,
            level: 1,
            streak: 0,
            totalMeetings: 0,
            totalVideos: 0,
            totalTime: 0
        };
        this.focusModeActive = false;
        this.focusStartTime = null;
        this.focusInterval = null;
        this.replyToMessage = null;
        this.editingMessageId = null;
        this.searchFilter = 'all';
        this.currentPlaylistId = null;
        this.notificationsList = [];
        this.isMinimized = {
            chat: false,
            ai: false
        };
        this.notificationSounds = {
            default: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFK3/K8N+SUgslUqPc79qtWxULN3y718m7cisgBCl6w+vap1oWCjpzuebOrWIbByNzv+vest...',
            bell: 'data:audio/wav;base64,UklGRhYGAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YfIFAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz+a2vLDcyYELIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiS1/HMeS0GKnzJ8N+RUAsmUqPc79qtWxULN3y718m7cisgBCl6w+vap1oWCjpzuebOrWIbByNzv+vest...',
            chime: 'data:audio/wav;base64,UklGRhQGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ8GAABiYGRhVVNeaGJXS0hRXntqWkI5RFK7tnVNMTE0kt/epm0kDStVx/Xku2sdBzuY5fzSsSUEJXjP+eOILAUkeMrz5KNYKCpUnODyy5NWIBcwbMnm989sFQcnWqTd8tCHPhQoQ47k+eSfTBgmPHXA5v3zvmAYDj53qeP14qtOGClBeKrl/f/+6JJFGDNiodL49/bKfToVLlN6u+jy99CkWygeOl13vuLx99...',
            pop: 'data:audio/wav;base64,UklGRjAGAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YfwFAABhYWJjZGVmaGlqa2xtbnBxcnN0dXZ3eHl6e3x9fn6AgYKDhIWGiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==',
            none: null
        };
        this.debugMode = false;
        this.emojiCategories = {
            smileys: ['😀', '😂', '😍', '🤔', '😎', '😢', '😡', '🥳', '😇', '🤗', '🤩', '😴', '🤯', '🥺', '😬', '🙄'],
            animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦄'],
            food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥗', '🍰', '🍩', '🍪', '🍫', '☕', '🍺', '🥤', '🍇', '🍓', '🥑'],
            activities: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🎮', '🎯', '🎪', '🎨', '🎬', '🎤', '🎧', '🎸', '🎹', '🎲'],
            objects: ['💡', '📱', '💻', '⌚', '📷', '🔍', '🔧', '🔨', '📌', '📎', '✂️', '📏', '📐', '🖊️', '📝', '💰']
        };
        
        // Enhanced settings
        this.settings = {
            notifications: true,
            chatNotifications: true,
            timerNotifications: true,
            meetingReminders: true,
            pushNotifications: false,
            mutedUntil: null,
            region: 'pl-PL',
            timeFormat: '24h',
            firstDayOfWeek: 'monday',
            deviceOptimization: 'auto',
            animations: true,
            reducedMotion: false,
            hapticFeedback: true,
            showOnlineStatus: true,
            showReadReceipts: true,
            showTypingIndicator: true,
            colorTheme: 'default',
            fontSize: 'normal',
            cardStyle: 'default',
            compactMode: false,
            notificationSound: 'default',
            enablePomodoro: false,
            pomodoroWork: 25,
            pomodoroBreak: 5,
            pomodoroLongBreak: 15,
            enableAutoBreak: false,
            enableFocusMode: false,
            enableAnalytics: true,
            enableKeyboardShortcuts: true,
            enableDarkModeSched: false,
            enableExperimentalFeatures: false,
            defaultReminderTime: 15,
            autoJoinTeams: false,
            muteOnJoin: true,
            cameraOffOnJoin: true,
            profileName: '',
            profileStatus: ''
        };
        
        // Initialize
        this.initSecurityMeasures();
        this.loadSettings();
        this.initKeyboardShortcuts();
        this.initAnalytics();
        this.waitForFirebase();
        this.checkDarkModeSchedule();
        this.initCharts();
        
        // Loading tips
        this.loadingTips = [
            'Wskazówka: Użyj Ctrl+K aby szybko wyszukać',
            'Wskazówka: Możesz zmienić avatar klikając na swoje zdjęcie',
            'Wskazówka: Tryb Pomodoro pomaga w skupieniu',
            'Wskazówka: Ustaw przypomnienia dla ważnych spotkań',
            'Wskazówka: Użyj tagów do organizacji spotkań',
            'Wskazówka: Eksportuj dane regularnie jako kopię zapasową',
            'Wskazówka: Tryb ciemny automatycznie włącza się wieczorem',
            'Wskazówka: Możesz edytować swoje wiadomości przez 5 minut'
        ];
        
        this.showRandomLoadingTip();
    }
    
    showRandomLoadingTip() {
        const tipElement = document.getElementById('loadingTip');
        if (tipElement) {
            const randomTip = this.loadingTips[Math.floor(Math.random() * this.loadingTips.length)];
            tipElement.textContent = randomTip;
        }
    }
    
    // Security initialization
    initSecurityMeasures() {
        // Prevent XSS attacks
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.chat-message, .user-info, .private-user-item')) {
                e.preventDefault();
            }
        });
        
        // Sanitize inputs
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.sanitizeInput(e.target);
            }
        });
        
        // Session management
        this.resetSessionTimeout();
        document.addEventListener('click', () => this.resetSessionTimeout());
        document.addEventListener('keypress', () => this.resetSessionTimeout());
        
        // Prevent clickjacking
        if (window.self !== window.top) {
            document.body.style.display = 'none';
        }
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
        const dangerous = /<script|javascript:|onclick|onerror|onload/gi;
        if (dangerous.test(input.value)) {
            input.value = input.value.replace(dangerous, '');
            this.showNotification('Wykryto niedozwolone znaki', 'warning');
        }
    }
    
    // Enhanced Keyboard Shortcuts
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!this.settings.enableKeyboardShortcuts) return;
            
            // Ctrl/Cmd + K - Open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            
            // Ctrl/Cmd + Shift + K - Open AI Assistant
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                this.openAIAssistant();
            }
            
            // Alt + T - Toggle theme
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
            
            // Alt + C - Toggle chat
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                this.toggleChat();
            }
            
            // Alt + S - Toggle settings
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                this.toggleSettings();
            }
            
            // Alt + N - Show notifications
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                this.toggleNotificationCenter();
            }
            
            // Alt + F - Toggle focus mode
            if (e.altKey && e.key === 'f') {
                e.preventDefault();
                this.toggleFocusMode();
            }
            
            // Escape - Close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    showKeyboardShortcuts() {
        const shortcuts = [
            { key: 'Ctrl/Cmd + K', action: 'Otwórz wyszukiwanie' },
            { key: 'Ctrl/Cmd + Shift + K', action: 'Otwórz asystenta AI' },
            { key: 'Alt + T', action: 'Zmień motyw' },
            { key: 'Alt + C', action: 'Pokaż/ukryj czat' },
            { key: 'Alt + S', action: 'Pokaż/ukryj ustawienia' },
            { key: 'Alt + N', action: 'Centrum powiadomień' },
            { key: 'Alt + F', action: 'Tryb skupienia' },
            { key: 'Escape', action: 'Zamknij okna dialogowe' }
        ];
        
        const content = `
            <div class="shortcuts-list">
                ${shortcuts.map(s => `
                    <div class="shortcut-item">
                        <span>${s.action}</span>
                        <span class="shortcut-key">${s.key}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.showModal('Skróty klawiszowe', content, 'shortcuts-modal');
    }
    
    // Enhanced Analytics
    initAnalytics() {
        if (!this.settings.enableAnalytics) return;
        
        // Track page views
        this.trackEvent('page_view', {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
        
        // Track session start
        this.trackEvent('session_start', {
            timestamp: new Date().toISOString()
        });
        
        // Track browser info
        this.trackEvent('browser_info', {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: `${screen.width}x${screen.height}`
        });
    }
    
    trackEvent(eventName, data = {}) {
        if (!this.settings.enableAnalytics) return;
        
        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            user: this.currentUser?.email || 'anonymous',
            sessionId: this.sessionId || this.generateSessionId()
        };
        
        // Store locally
        const analytics = this.loadFromStorage('analytics') || [];
        analytics.push(event);
        
        // Keep only last 1000 events
        if (analytics.length > 1000) {
            analytics.splice(0, analytics.length - 1000);
        }
        
        this.saveToStorage('analytics', analytics);
        
        if (this.debugMode) {
            console.log('Analytics Event:', event);
        }
        
        // Update user stats based on events
        this.updateUserStatsFromEvent(eventName, data);
    }
    
    generateSessionId() {
        this.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        return this.sessionId;
    }
    
    updateUserStatsFromEvent(eventName, data) {
        switch (eventName) {
            case 'meeting_created':
                this.userStats.totalMeetings++;
                this.addPoints(10);
                break;
            case 'timer_completed':
                this.addPoints(5);
                if (data.type === 'youtube') {
                    this.userStats.totalVideos++;
                }
                break;
            case 'pomodoro_completed':
                this.addPoints(15);
                break;
            case 'task_completed':
                this.addPoints(5);
                break;
        }
        
        this.updateUserStatsDisplay();
        this.checkAchievements();
    }
    
    addPoints(points) {
        this.userStats.points += points;
        
        // Calculate level
        const pointsPerLevel = 100;
        this.userStats.level = Math.floor(this.userStats.points / pointsPerLevel) + 1;
        
        this.saveToStorage('userStats', this.userStats);
    }
    
    updateUserStatsDisplay() {
        document.getElementById('userPoints').textContent = this.userStats.points;
        document.getElementById('userLevel').textContent = `Poziom ${this.userStats.level}`;
        document.getElementById('userStreak').textContent = this.userStats.streak;
        document.getElementById('userAchievements').textContent = Object.keys(this.achievements).length;
    }
    
    checkAchievements() {
        // Check for various achievements
        if (this.userStats.totalMeetings >= 10 && !this.achievements.meeting10) {
            this.unlockAchievement('meeting10', 'Organizator', 'Ukończ 10 spotkań', 'fa-users');
        }
        
        if (this.userStats.totalVideos >= 50 && !this.achievements.video50) {
            this.unlockAchievement('video50', 'Kinoman', 'Obejrzyj 50 filmów', 'fa-film');
        }
        
        if (this.userStats.streak >= 7 && !this.achievements.streak7) {
            this.unlockAchievement('streak7', 'Systematyczny', '7 dni aktywności z rzędu', 'fa-fire');
        }
        
        if (this.userStats.level >= 10 && !this.achievements.level10) {
            this.unlockAchievement('level10', 'Ekspert', 'Osiągnij poziom 10', 'fa-star');
        }
    }
    
    unlockAchievement(id, name, description, icon) {
        this.achievements[id] = {
            name,
            description,
            icon,
            unlockedAt: new Date().toISOString()
        };
        
        this.saveToStorage('achievements', this.achievements);
        this.addPoints(50); // Bonus points for achievement
        
        // Show achievement notification
        this.showAchievementNotification(name, description, icon);
    }
    
    showAchievementNotification(name, description, icon) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="achievement-content">
                <h4>Osiągnięcie odblokowane!</h4>
                <p>${name}</p>
                <small>${description}</small>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Enhanced Search functionality
    openSearch() {
        document.getElementById('searchOverlay').classList.add('active');
        document.getElementById('universalSearch').focus();
        
        this.trackEvent('search_opened');
    }
    
    closeSearch() {
        document.getElementById('searchOverlay').classList.remove('active');
        document.getElementById('universalSearch').value = '';
        document.getElementById('searchResults').innerHTML = '';
        document.getElementById('searchStatus').style.display = 'none';
    }
    
    setSearchFilter(button) {
        document.querySelectorAll('.search-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        this.searchFilter = button.dataset.filter;
        
        // Re-run search if there's a query
        const query = document.getElementById('universalSearch').value;
        if (query) {
            this.performSearch(query);
        }
    }
    
    async performSearch(query) {
        if (!query || query.length < 2) {
            document.getElementById('searchResults').innerHTML = '';
            return;
        }
        
        // Show search status
        document.getElementById('searchStatus').style.display = 'flex';
        
        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        // Search based on filter
        if (this.searchFilter === 'all' || this.searchFilter === 'meetings') {
            // Search meetings
            this.meetings.forEach(meeting => {
                if (meeting.title.toLowerCase().includes(lowerQuery) ||
                    meeting.description?.toLowerCase().includes(lowerQuery) ||
                    meeting.tags?.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'meeting',
                        icon: 'fa-users',
                        title: meeting.title,
                        meta: `Spotkanie - ${new Date(meeting.dateTime).toLocaleDateString(this.settings.region)}`,
                        data: meeting
                    });
                }
            });
        }
        
        if (this.searchFilter === 'all' || this.searchFilter === 'channels') {
            // Search favorite channels
            Object.entries(this.favoriteChannels).forEach(([id, channel]) => {
                if (channel.name.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'channel',
                        icon: 'fa-tv',
                        title: channel.name,
                        meta: 'Ulubiony kanał YouTube',
                        data: { id, ...channel }
                    });
                }
            });
        }
        
        if (this.searchFilter === 'all' || this.searchFilter === 'videos') {
            // Search watch history
            this.watchHistory.forEach(video => {
                if (video.title.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'video',
                        icon: 'fa-play-circle',
                        title: video.title,
                        meta: `Obejrzane - ${new Date(video.watchedAt).toLocaleDateString(this.settings.region)}`,
                        data: video
                    });
                }
            });
        }
        
        if (this.searchFilter === 'all' || this.searchFilter === 'users') {
            // Search users
            Object.entries(this.allUsers).forEach(([userId, userInfo]) => {
                if (userInfo.name?.toLowerCase().includes(lowerQuery) ||
                    userInfo.email?.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        type: 'user',
                        icon: 'fa-user',
                        title: userInfo.name || 'Użytkownik',
                        meta: userInfo.email || 'Brak emaila',
                        data: { userId, ...userInfo }
                    });
                }
            });
        }
        
        // Search in tags
        Object.entries(this.tags).forEach(([name, tag]) => {
            if (name.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'tag',
                    icon: 'fa-tag',
                    title: name,
                    meta: 'Tag',
                    data: tag
                });
            }
        });
        
        // Hide search status
        document.getElementById('searchStatus').style.display = 'none';
        
        // Display results
        this.displaySearchResults(results, query);
        
        // Add to search history
        this.addToSearchHistory(query);
        
        // Track search
        this.trackEvent('search_performed', { query, resultsCount: results.length, filter: this.searchFilter });
    }
    
    displaySearchResults(results, query) {
        const container = document.getElementById('searchResults');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Brak wyników dla "${this.escapeHtml(query)}"</p>
                    <p class="text-muted">Spróbuj innych słów kluczowych lub zmień filtr</p>
                </div>
            `;
            return;
        }
        
        // Group results by type
        const groupedResults = {};
        results.forEach(result => {
            if (!groupedResults[result.type]) {
                groupedResults[result.type] = [];
            }
            groupedResults[result.type].push(result);
        });
        
        let html = `
            <div class="search-results-header">
                <span>Znaleziono ${results.length} wyników dla "${this.escapeHtml(query)}"</span>
            </div>
        `;
        
        // Display grouped results
        Object.entries(groupedResults).forEach(([type, items]) => {
            const typeLabels = {
                meeting: 'Spotkania',
                channel: 'Kanały',
                video: 'Filmy',
                user: 'Użytkownicy',
                tag: 'Tagi'
            };
            
            html += `
                <div class="search-results-group">
                    <h4>${typeLabels[type] || type}</h4>
                    ${items.map(result => `
                        <div class="search-result-item" onclick='window.app.handleSearchResultClick("${result.type}", ${JSON.stringify(result.data).replace(/'/g, '&apos;')})'>
                            <div class="search-result-icon">
                                <i class="fas ${result.icon}"></i>
                            </div>
                            <div class="search-result-content">
                                <div class="search-result-title">${this.highlightSearchTerm(result.title, query)}</div>
                                <div class="search-result-meta">${result.meta}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    highlightSearchTerm(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    handleSearchResultClick(type, data) {
        this.closeSearch();
        
        switch (type) {
            case 'meeting':
                this.showTeamsMode();
                this.showTeamsTab('upcoming');
                // Highlight the meeting
                setTimeout(() => {
                    const element = document.querySelector(`[data-meeting-id="${data.id}"]`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        element.classList.add('highlight');
                        setTimeout(() => element.classList.remove('highlight'), 2000);
                    }
                }, 300);
                break;
                
            case 'channel':
                this.showYouTubeMode();
                this.showYouTubeTab('favorites');
                break;
                
            case 'video':
                window.open(data.url, '_blank');
                break;
                
            case 'user':
                this.toggleChat();
                this.switchChatTab('private');
                setTimeout(() => {
                    this.openPrivateChat(data.userId, data.name, data.picture);
                }, 300);
                break;
                
            case 'tag':
                this.showTeamsMode();
                this.showTeamsTab('tags');
                break;
        }
    }
    
    addToSearchHistory(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            if (this.searchHistory.length > 10) {
                this.searchHistory.pop();
            }
            this.saveToStorage('searchHistory', this.searchHistory);
        }
    }
    
    // Enhanced AI Assistant
    openAIAssistant() {
        document.getElementById('aiAssistant').classList.add('active');
        document.getElementById('aiInput').focus();
        
        if (this.aiMessages.length === 0) {
            this.addAIMessage('Cześć! Jestem asystentem TimerHub Pro. Mogę pomóc Ci w:', 'assistant');
            setTimeout(() => {
                this.addAIMessage(`• Zarządzaniu spotkaniami i timerami
• Wyszukiwaniu filmów na YouTube
• Organizacji czasu pracy
• Analizie Twoich statystyk
• Tworzeniu notatek i zadań
• Ustawieniach aplikacji

Jak mogę Ci dzisiaj pomóc?`, 'assistant');
            }, 500);
        }
        
        // Show suggestions based on context
        this.updateAISuggestions();
        
        this.trackEvent('ai_assistant_opened');
    }
    
    closeAIAssistant() {
        document.getElementById('aiAssistant').classList.remove('active');
    }
    
    minimizeAI() {
        const assistant = document.getElementById('aiAssistant');
        assistant.classList.toggle('minimized');
        this.isMinimized.ai = !this.isMinimized.ai;
    }
    
    updateAISuggestions() {
        const suggestions = document.getElementById('aiSuggestions');
        const upcomingMeetings = this.getUpcomingMeetings();
        
        let html = '';
        
        if (upcomingMeetings.length > 0) {
            html += `<button onclick="window.app.askAI('Jakie mam dzisiaj spotkania?')">Dzisiejsze spotkania</button>`;
        }
        
        if (this.currentTimer) {
            html += `<button onclick="window.app.askAI('Status aktywnego timera')">Status timera</button>`;
        }
        
        html += `
            <button onclick="window.app.askAI('Pokaż statystyki tygodnia')">Statystyki</button>
            <button onclick="window.app.askAI('Zaplanuj przerwę')">Zaplanuj przerwę</button>
            <button onclick="window.app.askAI('Pomoc')">Pomoc</button>
        `;
        
        suggestions.innerHTML = html;
    }
    
    async askAI(question) {
        document.getElementById('aiInput').value = question;
        await this.sendAIMessage();
    }
    
    async sendAIMessage() {
        const input = document.getElementById('aiInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        this.addAIMessage(message, 'user');
        
        // Show thinking indicator
        const thinkingId = this.addAIMessage('<div class="ai-thinking">Analizuję zapytanie</div>', 'assistant');
        
        // Process message
        const response = await this.processAIMessage(message);
        
        // Remove thinking indicator and add response
        this.removeAIMessage(thinkingId);
        this.addAIMessage(response, 'assistant');
        
        // Update suggestions
        this.updateAISuggestions();
        
        this.trackEvent('ai_message_sent', { message });
    }
    
    addAIMessage(content, type) {
        const messageId = Date.now();
        const message = { id: messageId, content, type };
        this.aiMessages.push(message);
        
        const container = document.getElementById('aiMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `ai-message ${type}`;
        messageElement.dataset.messageId = messageId;
        
        if (type === 'assistant' && content.includes('\n')) {
            // Format multi-line assistant messages
            messageElement.innerHTML = content.split('\n').map(line => 
                line.startsWith('•') ? `<li>${line.substring(1).trim()}</li>` : `<p>${line}</p>`
            ).join('');
        } else {
            messageElement.innerHTML = content;
        }
        
        container.appendChild(messageElement);
        container.scrollTop = container.scrollHeight;
        
        return messageId;
    }
    
    removeAIMessage(messageId) {
        this.aiMessages = this.aiMessages.filter(m => m.id !== messageId);
        const element = document.querySelector(`[data-message-id="${messageId}"]`);
        if (element) element.remove();
    }
    
    async processAIMessage(message) {
        // Simulate AI processing with enhanced responses
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        const lowerMessage = message.toLowerCase();
        
        // Meeting related
        if (lowerMessage.includes('spotkanie') || lowerMessage.includes('meeting')) {
            if (lowerMessage.includes('dzisiaj') || lowerMessage.includes('dziś')) {
                const today = new Date();
                const todayMeetings = this.meetings.filter(m => {
                    const meetingDate = new Date(m.dateTime);
                    return meetingDate.toDateString() === today.toDateString();
                });
                
                if (todayMeetings.length === 0) {
                    return 'Nie masz żadnych spotkań zaplanowanych na dzisiaj. Czy chcesz dodać nowe spotkanie?';
                }
                
                let response = `Masz ${todayMeetings.length} spotkań dzisiaj:\n\n`;
                todayMeetings.forEach(meeting => {
                    const time = new Date(meeting.dateTime).toLocaleTimeString(this.settings.region, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    response += `📅 ${meeting.title}\n🕐 ${time}\n⏱️ ${meeting.duration} minut\n\n`;
                });
                
                return response + 'Czy chcesz ustawić timer dla któregoś z nich?';
            } else if (lowerMessage.includes('dodaj') || lowerMessage.includes('nowe')) {
                this.showTeamsMode();
                this.showTeamsTab('new');
                return 'Otworzyłem formularz dodawania nowego spotkania. Wypełnij wymagane pola i kliknij "Rozpocznij odliczanie".';
            } else if (lowerMessage.includes('następne') || lowerMessage.includes('najbliższe')) {
                const upcoming = this.getUpcomingMeetings();
                if (upcoming.length === 0) {
                    return 'Nie masz żadnych zaplanowanych spotkań.';
                }
                const next = upcoming[0];
                const date = new Date(next.dateTime);
                const timeUntil = this.getTimeUntil(date);
                return `Twoje następne spotkanie:\n📅 ${next.title}\n🕐 ${date.toLocaleDateString(this.settings.region)} o ${date.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}\n⏰ Za ${timeUntil}`;
            }
        }
        
        // Timer related
        if (lowerMessage.includes('timer') || lowerMessage.includes('czas')) {
            if (this.currentTimer) {
                const remaining = this.currentTimer.endTime - new Date();
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                return `Masz aktywny timer:\n⏱️ ${this.currentTimer.title}\n⏰ Pozostało: ${minutes}m ${seconds}s\n\nCzy chcesz go zatrzymać lub wstrzymać?`;
            } else {
                return 'Nie masz aktywnego timera. Możesz ustawić timer dla:\n• Spotkania Teams\n• Filmu YouTube\n• Sesji Pomodoro\n• Szybkiego timera\n\nCo chcesz zaplanować?';
            }
        }
        
        // Statistics
        if (lowerMessage.includes('statystyk') || lowerMessage.includes('stats')) {
            const stats = this.calculateWeeklyStats();
            return `Statystyki z tego tygodnia:\n📊 Spotkania: ${stats.meetings}\n🎬 Filmy: ${stats.videos}\n⏱️ Całkowity czas: ${stats.totalTime}h\n🔥 Seria: ${this.userStats.streak} dni\n🏆 Punkty: ${this.userStats.points}\n\nŚwietnie Ci idzie! Tak trzymaj! 💪`;
        }
        
        // Pomodoro
        if (lowerMessage.includes('pomodoro') || lowerMessage.includes('przerw')) {
            if (lowerMessage.includes('zaplanuj') || lowerMessage.includes('rozpocznij')) {
                this.startPomodoro();
                return 'Rozpocząłem sesję Pomodoro! 🍅\n\n25 minut pracy, potem 5 minut przerwy. Powodzenia!';
            }
            return 'Technika Pomodoro to metoda zarządzania czasem:\n• 25 minut intensywnej pracy\n• 5 minut przerwy\n• Po 4 sesjach - dłuższa przerwa (15 min)\n\nChcesz rozpocząć sesję?';
        }
        
        // YouTube
        if (lowerMessage.includes('youtube') || lowerMessage.includes('film')) {
            if (lowerMessage.includes('szukaj') || lowerMessage.includes('znajdź')) {
                this.showYouTubeMode();
                this.showYouTubeTab('search');
                return 'Otworzyłem wyszukiwarkę YouTube. Możesz teraz wyszukać filmy, kanały lub playlisty.';
            }
            return 'Mogę pomóc Ci z YouTube:\n• Wyszukiwanie filmów\n• Zarządzanie ulubionymi kanałami\n• Tworzenie playlist\n• Planowanie oglądania\n\nCo chcesz zrobić?';
        }
        
        // Tasks
        if (lowerMessage.includes('zadani') || lowerMessage.includes('task')) {
            const activeTasks = this.tasks.filter(t => !t.completed).length;
            return `Masz ${activeTasks} aktywnych zadań. Czy chcesz:\n• Zobaczyć listę zadań\n• Dodać nowe zadanie\n• Oznaczyć zadanie jako ukończone?`;
        }
        
        // Settings
        if (lowerMessage.includes('ustawienia') || lowerMessage.includes('zmień')) {
            return 'Możesz zmienić wiele ustawień:\n• Motyw kolorystyczny\n• Rozmiar czcionki\n• Powiadomienia\n• Region i język\n• Tryb Pomodoro\n• I wiele więcej!\n\nOtwórz ustawienia klikając ikonę ⚙️ lub użyj Alt+S.';
        }
        
        // Help
        if (lowerMessage.includes('pomoc') || lowerMessage.includes('help')) {
            return `Oto główne funkcje TimerHub Pro:

🎯 **Spotkania Teams**
• Planuj i zarządzaj spotkaniami
• Automatyczne przypomnienia
• Spotkania cykliczne
• Integracja z kalendarzem

📺 **YouTube**
• Wyszukuj filmy i kanały
• Twórz playlisty
• Planuj oglądanie
• Rekomendacje

⏱️ **Timery i produktywność**
• Różne typy timerów
• Tryb Pomodoro
• Tryb skupienia
• Automatyczne przerwy

💬 **Komunikacja**
• Czat globalny
• Prywatne wiadomości
• Pokoje tematyczne
• Emotikony i reakcje

📊 **Analityka**
• Szczegółowe statystyki
• Wykresy i raporty
• Śledzenie postępów
• System osiągnięć

Czego dokładnie potrzebujesz?`;
        }
        
        // Weather (example of external integration)
        if (lowerMessage.includes('pogod') || lowerMessage.includes('weather')) {
            return 'Funkcja pogody będzie dostępna wkrótce! Na razie mogę pomóc Ci zaplanować spotkania niezależnie od pogody 😊';
        }
        
        // Jokes/Fun
        if (lowerMessage.includes('żart') || lowerMessage.includes('joke')) {
            const jokes = [
                'Dlaczego programiści preferują tryb ciemny? Bo światło przyciąga błędy! 🐛',
                'Jak nazywa się spotkanie Teams o 8 rano? Debugging życia! ☕',
                'Timer: "Jestem najlepszym przyjacielem prokrastynatora!" Prokrastynator: "Sprawdzę to później..." ⏰'
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
        
        // Default response with suggestions
        const suggestions = [
            'Czy chcesz zobaczyć dzisiejsze spotkania?',
            'Może ustawić timer Pomodoro?',
            'Chcesz sprawdzić swoje statystyki?',
            'Potrzebujesz pomocy z czymś konkretnym?'
        ];
        
        return `Nie jestem pewien, jak mogę pomóc w tym przypadku. ${suggestions[Math.floor(Math.random() * suggestions.length)]}\n\nMożesz też zapytać o:\n• Spotkania i timery\n• YouTube i filmy\n• Zadania i produktywność\n• Ustawienia aplikacji`;
    }
    
    getTimeUntil(date) {
        const now = new Date();
        const diff = date - now;
        
        if (diff < 0) return 'już minęło';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }
    
    calculateWeeklyStats() {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        const weeklyMeetings = this.meetings.filter(m => 
            new Date(m.dateTime) >= weekStart && new Date(m.dateTime) <= now
        ).length;
        
        const weeklyVideos = this.watchHistory.filter(v => 
            new Date(v.watchedAt) >= weekStart
        ).length;
        
        const totalTime = Math.round(this.userStats.totalTime / 60); // in hours
        
        return {
            meetings: weeklyMeetings,
            videos: weeklyVideos,
            totalTime: totalTime
        };
    }
    
    // Enhanced Notes functionality
    openNotesForTimer() {
        if (!this.currentTimer) {
            this.showNotification('Brak aktywnego timera', 'warning');
            return;
        }
        
        const modalTitle = `Notatki - ${this.currentTimer.title}`;
        document.getElementById('notesTitle').textContent = modalTitle;
        document.getElementById('notesModal').classList.add('active');
        
        // Load existing notes
        const noteKey = `timer_${this.currentTimer.type}_${this.currentTimer.startTime.getTime()}`;
        const existingNotes = this.notes[noteKey] || { before: '', during: '', after: '' };
        
        this.currentNoteType = 'during'; // Default to during for active timer
        this.switchNoteTab('during');
        document.getElementById('notesTextarea').value = existingNotes.during || '';
    }
    
    closeNotesModal() {
        document.getElementById('notesModal').classList.remove('active');
    }
    
    switchNoteTab(type) {
        this.currentNoteType = type;
        
        // Update tabs
        document.querySelectorAll('.note-tab').forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        // Load content for selected tab
        if (this.currentTimer) {
            const noteKey = `timer_${this.currentTimer.type}_${this.currentTimer.startTime.getTime()}`;
            const existingNotes = this.notes[noteKey] || { before: '', during: '', after: '' };
            document.getElementById('notesTextarea').value = existingNotes[type] || '';
        }
    }
    
    formatNote(format) {
        const textarea = document.getElementById('notesTextarea');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let formattedText = '';
        
        switch (format) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `__${selectedText}__`;
                break;
            case 'bullet':
                formattedText = `\n• ${selectedText}`;
                break;
            case 'number':
                formattedText = `\n1. ${selectedText}`;
                break;
            case 'task':
                formattedText = `\n- [ ] ${selectedText}`;
                break;
        }
        
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }
    
    insertTemplate() {
        const templates = {
            meeting: `## Agenda spotkania

### Uczestnicy
- 

### Tematy do omówienia
1. 
2. 
3. 

### Decyzje

### Następne kroki
- [ ] 
- [ ] 

### Notatki dodatkowe
`,
            daily: `## Daily Standup - ${new Date().toLocaleDateString(this.settings.region)}

### Co zrobiłem wczoraj?
- 

### Co planuję dzisiaj?
- 

### Blokery/Problemy
- 

### Potrzebna pomoc
- `,
            retrospective: `## Retrospektywa

### Co poszło dobrze? 🟢
- 

### Co można poprawić? 🟡
- 

### Co nie działało? 🔴
- 

### Action items
- [ ] 
- [ ] `
        };
        
        const selected = prompt('Wybierz szablon:\n1. Spotkanie\n2. Daily Standup\n3. Retrospektywa');
        let template = '';
        
        switch (selected) {
            case '1':
                template = templates.meeting;
                break;
            case '2':
                template = templates.daily;
                break;
            case '3':
                template = templates.retrospective;
                break;
            default:
                return;
        }
        
        const textarea = document.getElementById('notesTextarea');
        textarea.value = template + '\n' + textarea.value;
        textarea.focus();
    }
    
    saveNotes() {
        if (!this.currentTimer) return;
        
        const noteKey = `timer_${this.currentTimer.type}_${this.currentTimer.startTime.getTime()}`;
        const content = document.getElementById('notesTextarea').value;
        
        if (!this.notes[noteKey]) {
            this.notes[noteKey] = { before: '', during: '', after: '' };
        }
        
        this.notes[noteKey][this.currentNoteType] = content;
        this.saveToStorage('notes', this.notes);
        
        this.showNotification('Notatki zapisane!', 'success');
        this.addPoints(2);
    }
    
    exportNotes() {
        if (!this.currentTimer) return;
        
        const noteKey = `timer_${this.currentTimer.type}_${this.currentTimer.startTime.getTime()}`;
        const notes = this.notes[noteKey] || { before: '', during: '', after: '' };
        
        const content = `# Notatki - ${this.currentTimer.title}
Data: ${new Date().toLocaleDateString(this.settings.region)}
Czas: ${new Date().toLocaleTimeString(this.settings.region)}

## Przed spotkaniem
${notes.before || 'Brak notatek'}

## Podczas spotkania
${notes.during || 'Brak notatek'}

## Po spotkaniu
${notes.after || 'Brak notatek'}

---
Wygenerowano przez TimerHub Pro
`;
        
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `notatki-${this.currentTimer.title.replace(/[^a-z0-9]/gi, '_')}-${new Date().toISOString().split('T')[0]}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Notatki wyeksportowane!', 'success');
    }
    
    shareNotes() {
        if (!navigator.share) {
            this.showNotification('Twoja przeglądarka nie obsługuje udostępniania', 'error');
            return;
        }
        
        const noteKey = `timer_${this.currentTimer.type}_${this.currentTimer.startTime.getTime()}`;
        const notes = this.notes[noteKey] || { before: '', during: '', after: '' };
        const content = `Notatki - ${this.currentTimer.title}\n\n${notes[this.currentNoteType]}`;
        
        navigator.share({
            title: `Notatki - ${this.currentTimer.title}`,
            text: content
        }).catch(err => console.log('Share failed:', err));
    }
    
    // Tags functionality
    addNewTag() {
        const name = document.getElementById('newTagInput').value.trim();
        const color = document.getElementById('newTagColor').value;
        
        if (!name) {
            this.showNotification('Podaj nazwę tagu', 'warning');
            return;
        }
        
        if (this.tags[name]) {
            this.showNotification('Tag już istnieje', 'warning');
            return;
        }
        
        this.tags[name] = {
            color,
            createdAt: new Date().toISOString(),
            usageCount: 0
        };
        
        this.saveToStorage('tags', this.tags);
        this.displayTags();
        this.updateTagSuggestions();
        
        // Clear inputs
        document.getElementById('newTagInput').value = '';
        document.getElementById('newTagColor').value = '#6366f1';
        
        this.showNotification('Tag dodany!', 'success');
        this.addPoints(3);
    }
    
    displayTags() {
        const container = document.getElementById('tagsList');
        const tags = Object.entries(this.tags);
        
        if (tags.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak tagów</p>';
            return;
        }
        
        // Sort by usage count
        tags.sort((a, b) => (b[1].usageCount || 0) - (a[1].usageCount || 0));
        
        container.innerHTML = tags.map(([name, tag]) => `
            <span class="tag-item" style="background: ${tag.color}; color: ${this.getContrastColor(tag.color)}">
                ${this.escapeHtml(name)}
                <span class="tag-count">${tag.usageCount || 0}</span>
                <button class="tag-delete" onclick="window.app.deleteTag('${name}')">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
        
        // Update tag chart
        this.updateTagsChart(tags);
    }
    
    updateTagsChart(tags) {
        const chartContainer = document.getElementById('tagsChart');
        if (!chartContainer) return;
        
        // Simple text-based chart for now
        const maxUsage = Math.max(...tags.map(([_, tag]) => tag.usageCount || 0));
        
        chartContainer.innerHTML = `
            <div class="tags-chart">
                ${tags.slice(0, 5).map(([name, tag]) => {
                    const percentage = maxUsage > 0 ? ((tag.usageCount || 0) / maxUsage) * 100 : 0;
                    return `
                        <div class="tag-chart-item">
                            <span class="tag-name">${this.escapeHtml(name)}</span>
                            <div class="tag-bar">
                                <div class="tag-bar-fill" style="width: ${percentage}%; background: ${tag.color}"></div>
                            </div>
                            <span class="tag-usage">${tag.usageCount || 0}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    updateTagSuggestions() {
        const input = document.getElementById('meetingTags');
        if (!input) return;
        
        const suggestions = document.getElementById('tagSuggestions');
        const currentTags = input.value.split(',').map(t => t.trim());
        const lastTag = currentTags[currentTags.length - 1].toLowerCase();
        
        if (lastTag.length < 2) {
            suggestions.innerHTML = '';
            return;
        }
        
        const matchingTags = Object.keys(this.tags).filter(tag => 
            tag.toLowerCase().includes(lastTag) && !currentTags.slice(0, -1).includes(tag)
        );
        
        if (matchingTags.length === 0) {
            suggestions.innerHTML = '';
            return;
        }
        
        suggestions.innerHTML = matchingTags.map(tag => `
            <div class="tag-suggestion" onclick="window.app.selectTagSuggestion('${tag}')">
                <span class="tag-preview" style="background: ${this.tags[tag].color}; color: ${this.getContrastColor(this.tags[tag].color)}">
                    ${this.escapeHtml(tag)}
                </span>
            </div>
        `).join('');
    }
    
    selectTagSuggestion(tag) {
        const input = document.getElementById('meetingTags');
        const currentTags = input.value.split(',').map(t => t.trim());
        currentTags[currentTags.length - 1] = tag;
        input.value = currentTags.join(', ') + ', ';
        input.focus();
        document.getElementById('tagSuggestions').innerHTML = '';
    }
    
    deleteTag(name) {
        if (confirm(`Czy na pewno chcesz usunąć tag "${name}"?`)) {
            delete this.tags[name];
            this.saveToStorage('tags', this.tags);
            this.displayTags();
            this.showNotification('Tag usunięty', 'success');
        }
    }
    
    getContrastColor(hexColor) {
        // Convert hex to RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }
    
    // Playlists functionality
    createPlaylist() {
        const name = prompt('Nazwa playlisty:');
        if (!name) return;
        
        const playlistId = 'playlist_' + Date.now();
        this.playlists[playlistId] = {
            name,
            videos: [],
            createdAt: new Date().toISOString(),
            thumbnail: null
        };
        
        this.saveToStorage('playlists', this.playlists);
        this.displayPlaylists();
        this.updatePlaylistSelectors();
        this.showNotification('Playlista utworzona!', 'success');
        this.addPoints(5);
    }
    
    displayPlaylists() {
        const container = document.getElementById('playlistsList');
        const playlists = Object.entries(this.playlists);
        
        if (playlists.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak playlist</p>';
            return;
        }
        
        container.innerHTML = playlists.map(([id, playlist]) => `
            <div class="playlist-card" onclick="window.app.openPlaylist('${id}')">
                <div class="playlist-header">
                    <h4 class="playlist-title">${this.escapeHtml(playlist.name)}</h4>
                    <button onclick="event.stopPropagation(); window.app.deletePlaylist('${id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="playlist-count">${playlist.videos.length} filmów</div>
                <div class="playlist-videos">
                    ${playlist.videos.slice(0, 3).map(v => `
                        <div class="playlist-video">${this.escapeHtml(v.title)}</div>
                    `).join('')}
                    ${playlist.videos.length > 3 ? `<div class="playlist-more">+${playlist.videos.length - 3} więcej</div>` : ''}
                </div>
                <div class="playlist-duration">
                    <i class="fas fa-clock"></i> ${this.calculatePlaylistDuration(playlist.videos)}
                </div>
            </div>
        `).join('');
    }
    
    calculatePlaylistDuration(videos) {
        const totalMinutes = videos.reduce((sum, video) => sum + (video.duration || 0), 0);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    
    updatePlaylistSelectors() {
        const selector = document.getElementById('videoPlaylist');
        if (!selector) return;
        
        const playlists = Object.entries(this.playlists);
        selector.innerHTML = '<option value="">Wybierz playlistę...</option>' +
            playlists.map(([id, playlist]) => 
                `<option value="${id}">${this.escapeHtml(playlist.name)}</option>`
            ).join('');
    }
    
    openPlaylist(playlistId) {
        const playlist = this.playlists[playlistId];
        if (!playlist) return;
        
        this.currentPlaylistId = playlistId;
        document.getElementById('playlistViewTitle').textContent = playlist.name;
        document.getElementById('playlistViewModal').classList.add('active');
        
        this.displayPlaylistVideos(playlist.videos);
    }
    
    closePlaylistView() {
        document.getElementById('playlistViewModal').classList.remove('active');
        this.currentPlaylistId = null;
    }
    
    displayPlaylistVideos(videos) {
        const container = document.getElementById('playlistVideos');
        
        if (videos.length === 0) {
            container.innerHTML = '<p class="empty-state">Playlista jest pusta. Dodaj filmy podczas ustawiania timera.</p>';
            return;
        }
        
        container.innerHTML = videos.map((video, index) => `
            <div class="playlist-video-item" draggable="true" data-index="${index}">
                <div class="video-drag-handle">
                    <i class="fas fa-grip-vertical"></i>
                </div>
                <div class="video-number">${index + 1}</div>
                <div class="video-info">
                    <h4>${this.escapeHtml(video.title)}</h4>
                    <div class="video-meta">
                        <span><i class="fas fa-clock"></i> ${video.duration || 0} min</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(video.addedAt).toLocaleDateString(this.settings.region)}</span>
                    </div>
                </div>
                <div class="video-actions">
                    <button onclick="window.app.playVideo('${video.url}')" title="Odtwórz">
                        <i class="fas fa-play"></i>
                    </button>
                    <button onclick="window.app.removeFromPlaylist(${index})" title="Usuń">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add drag and drop functionality
        this.initPlaylistDragDrop();
    }
    
    initPlaylistDragDrop() {
        const items = document.querySelectorAll('.playlist-video-item');
        let draggedItem = null;
        
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                draggedItem = item;
                item.classList.add('dragging');
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = this.getDragAfterElement(e.currentTarget.parentNode, e.clientY);
                if (afterElement == null) {
                    e.currentTarget.parentNode.appendChild(draggedItem);
                } else {
                    e.currentTarget.parentNode.insertBefore(draggedItem, afterElement);
                }
            });
        });
    }
    
    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.playlist-video-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    addVideoToPlaylist() {
        if (!this.currentPlaylistId) return;
        
        const url = prompt('Podaj URL filmu YouTube:');
        if (!url) return;
        
        const title = prompt('Tytuł filmu:');
        if (!title) return;
        
        const duration = parseInt(prompt('Czas trwania (minuty):', '10'));
        
        const video = {
            url,
            title,
            duration: duration || 0,
            addedAt: new Date().toISOString()
        };
        
        this.playlists[this.currentPlaylistId].videos.push(video);
        this.saveToStorage('playlists', this.playlists);
        this.displayPlaylistVideos(this.playlists[this.currentPlaylistId].videos);
        this.displayPlaylists();
        
        this.showNotification('Film dodany do playlisty!', 'success');
    }
    
    removeFromPlaylist(index) {
        if (!this.currentPlaylistId) return;
        
        this.playlists[this.currentPlaylistId].videos.splice(index, 1);
        this.saveToStorage('playlists', this.playlists);
        this.displayPlaylistVideos(this.playlists[this.currentPlaylistId].videos);
        this.displayPlaylists();
        
        this.showNotification('Film usunięty z playlisty', 'success');
    }
    
    playVideo(url) {
        window.open(url, '_blank');
        this.addToWatchHistory({
            title: 'Film z playlisty',
            url,
            watchedAt: new Date().toISOString()
        });
    }
    
    playAllVideos() {
        if (!this.currentPlaylistId) return;
        
        const videos = this.playlists[this.currentPlaylistId].videos;
        if (videos.length === 0) return;
        
        // Open first video
        window.open(videos[0].url, '_blank');
        
        // Create a YouTube playlist URL if possible
        const videoIds = videos.map(v => this.extractVideoId(v.url)).filter(id => id);
        if (videoIds.length > 1) {
            const playlistUrl = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;
            setTimeout(() => {
                if (confirm('Otworzyć wszystkie filmy jako playlistę YouTube?')) {
                    window.open(playlistUrl, '_blank');
                }
            }, 1000);
        }
    }
    
    shufflePlaylist() {
        if (!this.currentPlaylistId) return;
        
        const videos = this.playlists[this.currentPlaylistId].videos;
        for (let i = videos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [videos[i], videos[j]] = [videos[j], videos[i]];
        }
        
        this.saveToStorage('playlists', this.playlists);
        this.displayPlaylistVideos(videos);
        this.showNotification('Playlista przemieszana!', 'success');
    }
    
    deletePlaylist(playlistId) {
        const playlist = this.playlists[playlistId];
        if (confirm(`Czy na pewno chcesz usunąć playlistę "${playlist.name}"?`)) {
            delete this.playlists[playlistId];
            this.saveToStorage('playlists', this.playlists);
            this.displayPlaylists();
            this.updatePlaylistSelectors();
            this.showNotification('Playlista usunięta', 'success');
        }
    }
    
    // Enhanced Pomodoro functionality
    startPomodoro() {
        if (this.pomodoroTimer) {
            this.showNotification('Pomodoro jest już aktywne', 'warning');
            return;
        }
        
        this.pomodoroTimer = {
            duration: this.settings.pomodoroWork * 60,
            remaining: this.settings.pomodoroWork * 60,
            isPaused: false
        };
        
        document.getElementById('pomodoroTimer').style.display = 'block';
        this.updatePomodoroDisplay();
        
        this.pomodoroInterval = setInterval(() => {
            if (!this.pomodoroTimer.isPaused && this.pomodoroTimer.remaining > 0) {
                this.pomodoroTimer.remaining--;
                this.updatePomodoroDisplay();
                
                if (this.pomodoroTimer.remaining === 0) {
                    this.completePomodoroSession();
                }
            }
        }, 1000);
        
        this.showNotification('Pomodoro rozpoczęte! Skupmy się na pracy 🍅', 'success');
        this.trackEvent('pomodoro_started');
    }
    
    updatePomodoroDisplay() {
        const minutes = Math.floor(this.pomodoroTimer.remaining / 60);
        const seconds = this.pomodoroTimer.remaining % 60;
        
        document.getElementById('pomodoroMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('pomodoroSeconds').textContent = String(seconds).padStart(2, '0');
        
        // Update document title
        document.title = `${minutes}:${String(seconds).padStart(2, '0')} - ${this.isWorkSession ? 'Praca' : 'Przerwa'} - Timer Hub Pro`;
    }
    
    completePomodoroSession() {
        clearInterval(this.pomodoroInterval);
        
        if (this.isWorkSession) {
            this.pomodoroSessions++;
            document.getElementById('pomodoroSessions').textContent = this.pomodoroSessions;
            
            // Play notification sound
            this.playNotificationSound();
            
            // Check if it's time for long break
            const isLongBreak = this.pomodoroSessions % 4 === 0;
            const breakDuration = isLongBreak ? this.settings.pomodoroLongBreak : this.settings.pomodoroBreak;
            
            // Show notification
            this.showNotification(
                isLongBreak ? 'Czas na długą przerwę! Świetna robota! 🎉' : 'Czas na przerwę! Dobra robota! ☕',
                'success'
            );
            
            // Add points
            this.addPoints(25);
            this.trackEvent('pomodoro_work_completed', { session: this.pomodoroSessions });
            
            // Start break
            this.isWorkSession = false;
            document.getElementById('pomodoroStatus').textContent = isLongBreak ? 'Długa przerwa' : 'Przerwa';
            
            this.pomodoroTimer = {
                duration: breakDuration * 60,
                remaining: breakDuration * 60,
                isPaused: false
            };
            
            this.pomodoroInterval = setInterval(() => {
                if (!this.pomodoroTimer.isPaused && this.pomodoroTimer.remaining > 0) {
                    this.pomodoroTimer.remaining--;
                    this.updatePomodoroDisplay();
                    
                    if (this.pomodoroTimer.remaining === 0) {
                        this.completePomodoroSession();
                    }
                }
            }, 1000);
        } else {
            // Break finished
            this.playNotificationSound();
            this.showNotification('Przerwa zakończona! Czas wrócić do pracy 💪', 'info');
            
            this.isWorkSession = true;
            document.getElementById('pomodoroStatus').textContent = 'Czas pracy';
            
            // Ask if continue
            if (confirm('Czy chcesz kontynuować z kolejną sesją?')) {
                this.startPomodoro();
            } else {
                this.stopPomodoro();
            }
        }
    }
    
    togglePomodoroPause() {
        if (!this.pomodoroTimer) return;
        
        this.pomodoroTimer.isPaused = !this.pomodoroTimer.isPaused;
        
        const button = event.target.closest('button');
        if (this.pomodoroTimer.isPaused) {
            button.innerHTML = '<i class="fas fa-play"></i>';
            this.showNotification('Pomodoro wstrzymane', 'info');
        } else {
            button.innerHTML = '<i class="fas fa-pause"></i>';
            this.showNotification('Pomodoro wznowione', 'info');
        }
    }
    
    skipPomodoroSession() {
        if (!this.pomodoroTimer) return;
        
        if (confirm('Czy na pewno chcesz pominąć tę sesję?')) {
            this.pomodoroTimer.remaining = 0;
        }
    }
    
    stopPomodoro() {
        if (this.pomodoroInterval) {
            clearInterval(this.pomodoroInterval);
        }
        
        this.pomodoroTimer = null;
        this.pomodoroInterval = null;
        document.getElementById('pomodoroTimer').style.display = 'none';
        document.title = 'Timer Hub Pro';
        
        this.showNotification('Pomodoro zatrzymane', 'info');
        this.trackEvent('pomodoro_stopped', { sessions: this.pomodoroSessions });
    }
    
    // Quick timer
    startQuickTimer() {
        const minutes = prompt('Na ile minut ustawić timer?', '25');
        if (!minutes || isNaN(minutes)) return;
        
        const duration = parseInt(minutes);
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + duration * 60000);
        
        this.startTimer('quick', startTime, duration, null, false, `Szybki timer (${duration} min)`);
        this.showNotification(`Timer ustawiony na ${duration} minut`, 'success');
    }
    
    // Focus Mode
    toggleFocusMode() {
        if (this.focusModeActive) {
            this.exitFocusMode();
        } else {
            this.enterFocusMode();
        }
    }
    
    enterFocusMode() {
        this.focusModeActive = true;
        this.focusStartTime = new Date();
        
        document.getElementById('focusModeOverlay').style.display = 'flex';
        document.body.classList.add('focus-mode');
        
        // Hide distracting elements
        document.getElementById('globalChat').classList.remove('active');
        document.getElementById('settingsPanel').classList.remove('active');
        document.getElementById('notificationCenter').style.display = 'none';
        
        // Start focus timer
        this.focusInterval = setInterval(() => {
            const elapsed = new Date() - this.focusStartTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            document.getElementById('focusTimer').textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
        
        this.showNotification('Tryb skupienia aktywny. Powodzenia! 🎯', 'success');
        this.trackEvent('focus_mode_started');
    }
    
    exitFocusMode() {
        this.focusModeActive = false;
        
        document.getElementById('focusModeOverlay').style.display = 'none';
        document.body.classList.remove('focus-mode');
        
        if (this.focusInterval) {
            clearInterval(this.focusInterval);
        }
        
        const focusDuration = new Date() - this.focusStartTime;
        const minutes = Math.floor(focusDuration / 60000);
        
        this.showNotification(`Tryb skupienia zakończony. Czas trwania: ${minutes} minut`, 'success');
        this.addPoints(Math.floor(minutes / 5)); // 1 point per 5 minutes
        this.trackEvent('focus_mode_ended', { duration: minutes });
    }
    
    // Tasks functionality
    showTasks() {
        document.getElementById('tasksModal').classList.add('active');
        this.displayTasks();
    }
    
    closeTasksModal() {
        document.getElementById('tasksModal').classList.remove('active');
    }
    
    addTask() {
        const title = document.getElementById('newTaskInput').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;
        const priority = document.getElementById('taskPriority').value;
        
        if (!title) {
            this.showNotification('Podaj nazwę zadania', 'warning');
            return;
        }
        
        const task = {
            id: 'task_' + Date.now(),
            title,
            dueDate,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        this.saveToStorage('tasks', this.tasks);
        this.displayTasks();
        
        // Clear inputs
        document.getElementById('newTaskInput').value = '';
        document.getElementById('taskDueDate').value = '';
        
        this.showNotification('Zadanie dodane!', 'success');
        this.addPoints(3);
    }
    
    displayTasks(filter = 'all') {
        const container = document.getElementById('tasksList');
        let filteredTasks = [...this.tasks];
        
        // Apply filter
        const now = new Date();
        switch (filter) {
            case 'active':
                filteredTasks = filteredTasks.filter(t => !t.completed);
                break;
            case 'completed':
                filteredTasks = filteredTasks.filter(t => t.completed);
                break;
            case 'overdue':
                filteredTasks = filteredTasks.filter(t => 
                    !t.completed && t.dueDate && new Date(t.dueDate) < now
                );
                break;
        }
        
        if (filteredTasks.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak zadań</p>';
            return;
        }
        
        // Sort by priority and due date
        filteredTasks.sort((a, b) => {
            if (a.completed !== b.completed) return a.completed ? 1 : -1;
            if (a.priority !== b.priority) {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        });
        
        container.innerHTML = filteredTasks.map(task => {
            const priorityColors = {
                high: '#ef4444',
                medium: '#f59e0b',
                low: '#10b981'
            };
            
            const isOverdue = task.dueDate && new Date(task.dueDate) < now && !task.completed;
            
            return `
                <div class="task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}">
                    <input type="checkbox" 
                           ${task.completed ? 'checked' : ''} 
                           onchange="window.app.toggleTask('${task.id}')">
                    <div class="task-content">
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        ${task.dueDate ? `
                            <div class="task-meta">
                                <i class="fas fa-calendar"></i> 
                                ${new Date(task.dueDate).toLocaleDateString(this.settings.region)}
                            </div>
                        ` : ''}
                    </div>
                    <div class="task-priority" style="color: ${priorityColors[task.priority]}">
                        <i class="fas fa-flag"></i>
                    </div>
                    <button class="task-delete" onclick="window.app.deleteTask('${task.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
    }
    
    filterTasks(filter) {
        // Update active filter button
        document.querySelectorAll('.task-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.displayTasks(filter);
    }
    
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            
            this.saveToStorage('tasks', this.tasks);
            this.displayTasks();
            
            if (task.completed) {
                this.showNotification('Zadanie ukończone! 🎉', 'success');
                this.addPoints(5);
                this.trackEvent('task_completed', { priority: task.priority });
            }
        }
    }
    
    deleteTask(taskId) {
        if (confirm('Czy na pewno chcesz usunąć to zadanie?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveToStorage('tasks', this.tasks);
            this.displayTasks();
            this.showNotification('Zadanie usunięte', 'success');
        }
    }
    
    // Goals functionality
    showGoals() {
        document.getElementById('goalsModal').classList.add('active');
        this.showGoalCategory('daily');
    }
    
    closeGoalsModal() {
        document.getElementById('goalsModal').classList.remove('active');
    }
    
    showGoalCategory(category) {
        // Update active category button
        document.querySelectorAll('.goal-category').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        const container = document.getElementById('goalsContent');
        
        if (category === 'achievements') {
            this.displayAchievements(container);
        } else {
            this.displayGoals(container, category);
        }
    }
    
    displayGoals(container, category) {
        const goals = this.getGoalsForCategory(category);
        
        container.innerHTML = goals.map(goal => {
            const progress = this.calculateGoalProgress(goal);
            const percentage = (progress.current / progress.target) * 100;
            
            return `
                <div class="goal-item ${progress.completed ? 'completed' : ''}">
                    <div class="goal-icon">
                        <i class="fas ${goal.icon}"></i>
                    </div>
                    <div class="goal-info">
                        <h4>${goal.name}</h4>
                        <p>${goal.description}</p>
                        <div class="goal-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${Math.min(percentage, 100)}%"></div>
                            </div>
                            <span>${progress.current}/${progress.target}</span>
                        </div>
                    </div>
                    <div class="goal-reward">
                        <i class="fas fa-coins"></i> +${goal.points} pkt
                    </div>
                </div>
            `;
        }).join('');
    }
    
    getGoalsForCategory(category) {
        const goals = {
            daily: [
                {
                    id: 'daily_meeting',
                    name: 'Codzienne spotkanie',
                    description: 'Weź udział w przynajmniej jednym spotkaniu',
                    icon: 'fa-calendar-day',
                    points: 10,
                    target: 1
                },
                {
                    id: 'daily_pomodoro',
                    name: 'Sesje Pomodoro',
                    description: 'Ukończ 4 sesje Pomodoro',
                    icon: 'fa-seedling',
                    points: 20,
                    target: 4
                },
                {
                    id: 'daily_tasks',
                    name: 'Zadania dnia',
                    description: 'Ukończ 5 zadań',
                    icon: 'fa-check-circle',
                    points: 15,
                    target: 5
                }
            ],
            weekly: [
                {
                    id: 'weekly_meetings',
                    name: 'Tydzień spotkań',
                    description: 'Uczestniczyć w 10 spotkaniach',
                    icon: 'fa-users',
                    points: 50,
                    target: 10
                },
                {
                    id: 'weekly_videos',
                    name: 'Materiały edukacyjne',
                    description: 'Obejrzyj 15 filmów',
                    icon: 'fa-graduation-cap',
                    points: 30,
                    target: 15
                },
                {
                    id: 'weekly_focus',
                    name: 'Czas skupienia',
                    description: '10 godzin w trybie skupienia',
                    icon: 'fa-brain',
                    points: 40,
                    target: 600 // minutes
                }
            ],
            monthly: [
                {
                    id: 'monthly_streak',
                    name: 'Mistrz konsekwencji',
                    description: 'Utrzymaj 30-dniową serię',
                    icon: 'fa-fire',
                    points: 100,
                    target: 30
                },
                {
                    id: 'monthly_productivity',
                    name: 'Produktywność Pro',
                    description: 'Ukończ 100 zadań',
                    icon: 'fa-rocket',
                    points: 80,
                    target: 100
                },
                {
                    id: 'monthly_learning',
                    name: 'Mistrz nauki',
                    description: 'Oglądnij 50 filmów edukacyjnych',
                    icon: 'fa-book',
                    points: 60,
                    target: 50
                }
            ]
        };
        
        return goals[category] || [];
    }
    
    calculateGoalProgress(goal) {
        const today = new Date();
        let current = 0;
        let completed = false;
        
        switch (goal.id) {
            case 'daily_meeting':
                current = this.meetings.filter(m => {
                    const meetingDate = new Date(m.dateTime);
                    return meetingDate.toDateString() === today.toDateString();
                }).length;
                break;
                
            case 'daily_pomodoro':
                current = this.pomodoroSessions;
                break;
                
            case 'daily_tasks':
                current = this.tasks.filter(t => 
                    t.completed && new Date(t.completedAt).toDateString() === today.toDateString()
                ).length;
                break;
                
            case 'weekly_meetings':
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - today.getDay());
                current = this.meetings.filter(m => 
                    new Date(m.dateTime) >= weekStart
                ).length;
                break;
                
            case 'monthly_streak':
                current = this.userStats.streak;
                break;
        }
        
        completed = current >= goal.target;
        
        return { current, target: goal.target, completed };
    }
    
    displayAchievements(container) {
        const achievements = Object.entries(this.achievements);
        
        if (achievements.length === 0) {
            container.innerHTML = '<p class="empty-state">Jeszcze nie zdobyłeś żadnych osiągnięć. Kontynuuj korzystanie z aplikacji!</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="achievements-grid">
                ${achievements.map(([id, achievement]) => `
                    <div class="achievement-card">
                        <div class="achievement-icon">
                            <i class="fas ${achievement.icon}"></i>
                        </div>
                        <h4>${achievement.name}</h4>
                        <p>${achievement.description}</p>
                        <div class="achievement-date">
                            <i class="fas fa-calendar"></i>
                            ${new Date(achievement.unlockedAt).toLocaleDateString(this.settings.region)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Calendar Integration
    showCalendarIntegration() {
        document.getElementById('calendarModal').classList.add('active');
        this.renderCalendar();
    }
    
    closeCalendarModal() {
        document.getElementById('calendarModal').classList.remove('active');
    }
    
    renderCalendar() {
        const now = new Date();
        this.currentCalendarMonth = this.currentCalendarMonth || new Date(now.getFullYear(), now.getMonth(), 1);
        
        const year = this.currentCalendarMonth.getFullYear();
        const month = this.currentCalendarMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        
        // Adjust to start from Monday or Sunday based on settings
        const startDayOfWeek = this.settings.firstDayOfWeek === 'monday' ? 1 : 0;
        while (startDate.getDay() !== startDayOfWeek) {
            startDate.setDate(startDate.getDate() - 1);
        }
        
        // Update month/year display
        const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
                          'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;
        
        // Generate calendar grid
        const grid = document.getElementById('calendarGrid');
        let html = '<div class="calendar-weekdays">';
        
        // Weekday headers
        const weekdays = this.settings.firstDayOfWeek === 'monday' 
            ? ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz']
            : ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
        
        weekdays.forEach(day => {
            html += `<div class="calendar-weekday">${day}</div>`;
        });
        html += '</div><div class="calendar-days">';
        
        // Calendar days
        const endDate = new Date(lastDay);
        while (endDate.getDay() !== ((startDayOfWeek + 6) % 7)) {
            endDate.setDate(endDate.getDate() + 1);
        }
        
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.toDateString() === now.toDateString();
            const dateStr = currentDate.toISOString().split('T')[0];
            
            // Get events for this day
            const dayEvents = this.getEventsForDate(currentDate);
            
            html += `
                <div class="calendar-day ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}"
                     onclick="window.app.showDayEvents('${dateStr}')">
                    <div class="calendar-day-number">${currentDate.getDate()}</div>
                    ${dayEvents.length > 0 ? `
                        <div class="calendar-day-events">
                            ${dayEvents.slice(0, 3).map(event => `
                                <div class="calendar-event" style="background: ${event.color}"></div>
                            `).join('')}
                            ${dayEvents.length > 3 ? `<div class="calendar-more">+${dayEvents.length - 3}</div>` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        html += '</div>';
        grid.innerHTML = html;
    }
    
    getEventsForDate(date) {
        const events = [];
        const dateStr = date.toDateString();
        
        // Add meetings
        this.meetings.forEach(meeting => {
            if (new Date(meeting.dateTime).toDateString() === dateStr) {
                events.push({
                    type: 'meeting',
                    title: meeting.title,
                    time: new Date(meeting.dateTime).toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'}),
                    color: '#6366f1'
                });
            }
        });
        
        // Add completed timers from history
        this.meetingsHistory.forEach(meeting => {
            if (new Date(meeting.dateTime).toDateString() === dateStr) {
                events.push({
                    type: 'completed',
                    title: meeting.title,
                    time: new Date(meeting.dateTime).toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'}),
                    color: '#10b981'
                });
            }
        });
        
        return events;
    }
    
    showDayEvents(dateStr) {
        const date = new Date(dateStr);
        const events = this.getEventsForDate(date);
        
        if (events.length === 0) {
            this.showNotification('Brak wydarzeń w tym dniu', 'info');
            return;
        }
        
        const content = `
            <div class="day-events">
                <h4>${date.toLocaleDateString(this.settings.region, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</h4>
                ${events.map(event => `
                    <div class="day-event-item">
                        <div class="event-time">${event.time}</div>
                        <div class="event-title" style="color: ${event.color}">${event.title}</div>
                        <div class="event-type">${event.type === 'meeting' ? 'Spotkanie' : 'Zakończone'}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.showModal('Wydarzenia dnia', content);
    }
    
    previousMonth() {
        this.currentCalendarMonth.setMonth(this.currentCalendarMonth.getMonth() - 1);
        this.renderCalendar();
    }
    
    nextMonth() {
        this.currentCalendarMonth.setMonth(this.currentCalendarMonth.getMonth() + 1);
        this.renderCalendar();
    }
    
    // Notification Center
    toggleNotificationCenter() {
        const center = document.getElementById('notificationCenter');
        const isActive = center.classList.toggle('active');
        
        if (isActive) {
            this.displayNotifications();
            this.markNotificationsAsRead();
        }
    }
    
    displayNotifications() {
        const container = document.getElementById('notificationsList');
        
        if (this.notificationsList.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak nowych powiadomień</p>';
            return;
        }
        
        container.innerHTML = this.notificationsList.map((notification, index) => `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}" onclick="window.app.handleNotificationClick(${index})">
                <div class="notification-icon">
                    <i class="fas ${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${this.getTimeAgo(new Date(notification.timestamp))}</div>
                </div>
                ${notification.actionUrl ? `
                    <button class="notification-action" onclick="event.stopPropagation(); window.app.openNotificationAction('${notification.actionUrl}')">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                ` : ''}
            </div>
        `).join('');
    }
    
    addNotification(title, message, icon = 'fa-bell', actionUrl = null) {
        const notification = {
            id: Date.now(),
            title,
            message,
            icon,
            actionUrl,
            timestamp: new Date().toISOString(),
            read: false
        };
        
        this.notificationsList.unshift(notification);
        
        // Keep only last 50 notifications
        if (this.notificationsList.length > 50) {
            this.notificationsList = this.notificationsList.slice(0, 50);
        }
        
        this.saveToStorage('notifications', this.notificationsList);
        this.updateNotificationBadge();
        
        // Show in-app notification
        this.showNotification(`${title}: ${message}`, 'info');
        
        // Push notification if enabled
        if (this.settings.pushNotifications) {
            this.sendPushNotification(title, message);
        }
    }
    
    markNotificationsAsRead() {
        this.notificationsList.forEach(n => n.read = true);
        this.saveToStorage('notifications', this.notificationsList);
        this.updateNotificationBadge();
    }
    
    updateNotificationBadge() {
        const unreadCount = this.notificationsList.filter(n => !n.read).length;
        const badge = document.getElementById('notificationBadge');
        
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
    
    handleNotificationClick(index) {
        const notification = this.notificationsList[index];
        if (notification.actionUrl) {
            window.open(notification.actionUrl, '_blank');
        }
    }
    
    openNotificationAction(url) {
        window.open(url, '_blank');
    }
    
    clearAllNotifications() {
        if (confirm('Czy na pewno chcesz wyczyścić wszystkie powiadomienia?')) {
            this.notificationsList = [];
            this.saveToStorage('notifications', this.notificationsList);
            this.displayNotifications();
            this.updateNotificationBadge();
        }
    }
    
    // Profile management
    updateProfile() {
        const name = document.getElementById('profileName').value.trim();
        const status = document.getElementById('profileStatus').value.trim();
        
        if (name) {
            this.settings.profileName = name;
            this.currentUser.name = name;
            document.getElementById('userName').textContent = name;
            document.getElementById('welcomeName').textContent = name.split(' ')[0];
        }
        
        this.settings.profileStatus = status;
        this.saveSettings();
        
        // Update Firebase profile if connected
        if (this.firebaseUser && this.isFirebaseReady) {
            this.updateFirebaseUserProfile(this.currentUser);
        }
        
        this.showNotification('Profil zaktualizowany!', 'success');
    }
    
    // Enhanced Teams Settings
    updateTeamsSettings() {
        this.settings.autoJoinTeams = document.getElementById('autoJoinTeams').checked;
        this.settings.muteOnJoin = document.getElementById('muteOnJoin').checked;
        this.settings.cameraOffOnJoin = document.getElementById('cameraOffOnJoin').checked;
        this.settings.defaultReminderTime = parseInt(document.getElementById('defaultReminderTime').value);
        this.saveSettings();
        this.showNotification('Ustawienia Teams zapisane', 'success');
    }
    
    generateMeetingLink() {
        // Simulate generating a Teams link
        const randomId = Math.random().toString(36).substr(2, 9);
        const link = `https://teams.microsoft.com/l/meetup-join/19:meeting_${randomId}@thread.v2/0?context=%7b%22Tid%22:%22example%22%7d`;
        document.getElementById('meetingLink').value = link;
        this.showNotification('Link wygenerowany!', 'success');
    }
    
    setDuration(minutes) {
        document.getElementById('meetingDuration').value = minutes;
    }
    
    importFromTeams() {
        this.showNotification('Funkcja importu z Teams będzie dostępna wkrótce!', 'info');
        // TODO: Implement Teams import via API
    }
    
    syncWithOutlook() {
        this.showNotification('Synchronizacja z Outlook będzie dostępna wkrótce!', 'info');
        // TODO: Implement Outlook sync
    }
    
    // Recent activity
    addToRecentActivity(type, title, icon = 'fa-clock') {
        const activity = {
            type,
            title,
            icon,
            timestamp: new Date().toISOString()
        };
        
        this.recentActivity.unshift(activity);
        if (this.recentActivity.length > 20) {
            this.recentActivity.pop();
        }
        
        this.saveToStorage('recentActivity', this.recentActivity);
        this.displayRecentActivity();
    }
    
    displayRecentActivity() {
        const container = document.getElementById('recentActivityList');
        
        if (this.recentActivity.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak ostatniej aktywności</p>';
            return;
        }
        
        container.innerHTML = this.recentActivity.slice(0, 10).map(activity => {
            const date = new Date(activity.timestamp);
            const timeAgo = this.getTimeAgo(date);
            
            return `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div>${this.escapeHtml(activity.title)}</div>
                        <div class="activity-time">${timeAgo}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        if (seconds < 60) return 'Przed chwilą';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min temu`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} godz. temu`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} dni temu`;
        
        return date.toLocaleDateString(this.settings.region);
    }
    
    // Today's Schedule
    updateTodaySchedule() {
        const container = document.getElementById('todaySchedule');
        const today = new Date();
        const todayEvents = [];
        
        // Get today's meetings
        this.meetings.forEach(meeting => {
            const meetingDate = new Date(meeting.dateTime);
            if (meetingDate.toDateString() === today.toDateString()) {
                todayEvents.push({
                    time: meetingDate,
                    type: 'meeting',
                    title: meeting.title,
                    duration: meeting.duration,
                    icon: 'fa-users',
                    color: '#6366f1'
                });
            }
        });
        
        // Sort by time
        todayEvents.sort((a, b) => a.time - b.time);
        
        if (todayEvents.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak zaplanowanych wydarzeń na dziś</p>';
            return;
        }
        
        container.innerHTML = `
            <div class="timeline">
                ${todayEvents.map(event => {
                    const timeStr = event.time.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'});
                    const isPast = event.time < now;
                    const isCurrent = !isPast && event.time < new Date(now.getTime() + event.duration * 60000);
                    
                    return `
                        <div class="timeline-item ${isPast ? 'past' : ''} ${isCurrent ? 'current' : ''}">
                            <div class="timeline-time">${timeStr}</div>
                            <div class="timeline-marker" style="background: ${event.color}">
                                <i class="fas ${event.icon}"></i>
                            </div>
                            <div class="timeline-content">
                                <div class="timeline-title">${event.title}</div>
                                <div class="timeline-duration">${event.duration} min</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    // Enhanced Meetings Filters
    filterMeetings() {
        const searchQuery = document.getElementById('meetingsSearch').value.toLowerCase();
        const filterType = document.getElementById('meetingsFilter').value;
        
        let filtered = [...this.meetings];
        
        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(meeting => 
                meeting.title.toLowerCase().includes(searchQuery) ||
                meeting.link.toLowerCase().includes(searchQuery) ||
                meeting.tags?.toLowerCase().includes(searchQuery) ||
                meeting.description?.toLowerCase().includes(searchQuery)
            );
        }
        
        // Date filter
        const now = new Date();
        switch (filterType) {
            case 'today':
                filtered = filtered.filter(m => {
                    const date = new Date(m.dateTime);
                    return date.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(m => {
                    const date = new Date(m.dateTime);
                    return date >= now && date <= weekFromNow;
                });
                break;
            case 'month':
                const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                filtered = filtered.filter(m => {
                    const date = new Date(m.dateTime);
                    return date >= now && date <= monthFromNow;
                });
                break;
        }
        
        // Display filtered results
        this.displayFilteredMeetings(filtered);
    }
    
    displayFilteredMeetings(meetings) {
        const container = document.getElementById('upcomingMeetings');
        
        if (meetings.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak spotkań spełniających kryteria</p>';
            return;
        }
        
        // Sort by date
        meetings.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        
        container.innerHTML = meetings.map(meeting => {
            const meetingDate = new Date(meeting.dateTime);
            const tags = meeting.tags ? meeting.tags.split(',').map(tag => tag.trim()) : [];
            
            return `
                <div class="history-item" data-meeting-id="${meeting.id}">
                    <div class="history-info">
                        <h4>${this.escapeHtml(meeting.title)}</h4>
                        <div class="history-meta">
                            <span><i class="fas fa-calendar"></i> ${meetingDate.toLocaleDateString(this.settings.region)}</span>
                            <span><i class="fas fa-clock"></i> ${meetingDate.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}</span>
                            <span><i class="fas fa-hourglass"></i> ${meeting.duration} min</span>
                        </div>
                        ${meeting.description ? `
                            <div class="meeting-description">${this.escapeHtml(meeting.description)}</div>
                        ` : ''}
                        ${tags.length > 0 ? `
                            <div class="meeting-tags">
                                ${tags.map(tag => {
                                    if (this.tags[tag]) {
                                        this.tags[tag].usageCount = (this.tags[tag].usageCount || 0) + 1;
                                    }
                                    return `
                                        <span class="tag-item" style="background: ${this.tags[tag]?.color || '#6366f1'}; color: ${this.getContrastColor(this.tags[tag]?.color || '#6366f1')}">
                                            ${this.escapeHtml(tag)}
                                        </span>
                                    `;
                                }).join('')}
                            </div>
                        ` : ''}
                        ${meeting.participants ? `
                            <div class="meeting-participants">
                                <i class="fas fa-user-friends"></i> ${this.escapeHtml(meeting.participants)}
                            </div>
                        ` : ''}
                    </div>
                    <div class="history-actions">
                        <button onclick="window.app.startMeetingTimer(${meeting.id})" title="Rozpocznij timer">
                            <i class="fas fa-play"></i>
                        </button>
                        <button onclick="window.app.editMeeting(${meeting.id})" title="Edytuj">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="window.app.openNotesForMeeting(${meeting.id})" title="Notatki">
                            <i class="fas fa-sticky-note"></i>
                        </button>
                        <button onclick="window.app.deleteMeeting(${meeting.id})" title="Usuń">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Save tag usage counts
        this.saveToStorage('tags', this.tags);
    }
    
    showAdvancedFilters() {
        // TODO: Implement advanced filters modal
        this.showNotification('Zaawansowane filtry będą dostępne wkrótce!', 'info');
    }
    
    editMeeting(id) {
        const meeting = this.meetings.find(m => m.id === id);
        if (!meeting) return;
        
        // Populate form with meeting data
        document.getElementById('meetingTitle').value = meeting.title;
        document.getElementById('meetingLink').value = meeting.link;
        document.getElementById('meetingDate').value = meeting.dateTime.split('T')[0];
        document.getElementById('meetingTime').value = meeting.dateTime.split('T')[1].substring(0, 5);
        document.getElementById('meetingDuration').value = meeting.duration;
        document.getElementById('meetingTags').value = meeting.tags || '';
        document.getElementById('meetingDescription').value = meeting.description || '';
        document.getElementById('meetingParticipants').value = meeting.participants || '';
        document.getElementById('autoOpenTeams').checked = meeting.autoOpen;
        
        // Remove the old meeting
        this.meetings = this.meetings.filter(m => m.id !== id);
        this.saveUserData('meetings', this.meetings);
        
        // Switch to new meeting tab
        this.showTeamsTab('new');
        
        this.showNotification('Edytuj spotkanie i kliknij "Rozpocznij odliczanie"', 'info');
    }
    
    // Recurring meetings
    setupRecurringMeetings() {
        const checkbox = document.getElementById('recurringMeeting');
        const options = document.getElementById('recurringOptions');
        
        if (checkbox.checked) {
            options.style.display = 'block';
        } else {
            options.style.display = 'none';
        }
    }
    
    displayRecurringMeetings() {
        const container = document.getElementById('recurringMeetings');
        
        if (this.recurringMeetings.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak spotkań cyklicznych</p>';
            return;
        }
        
        container.innerHTML = this.recurringMeetings.map(meeting => {
            const nextOccurrence = this.getNextOccurrence(meeting);
            
            return `
                <div class="recurring-meeting-item">
                    <div class="meeting-info">
                        <h4>${this.escapeHtml(meeting.title)}</h4>
                        <div class="meeting-pattern">
                            <i class="fas fa-redo"></i> ${this.getPatternDescription(meeting.pattern)}
                        </div>
                        <div class="meeting-next">
                            <i class="fas fa-calendar-alt"></i> Następne: ${nextOccurrence.toLocaleDateString(this.settings.region)}
                        </div>
                    </div>
                    <div class="meeting-actions">
                        <button onclick="window.app.pauseRecurringMeeting('${meeting.id}')">
                            <i class="fas fa-pause"></i>
                        </button>
                        <button onclick="window.app.deleteRecurringMeeting('${meeting.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    getNextOccurrence(meeting) {
        // TODO: Calculate next occurrence based on pattern
        return new Date();
    }
    
    getPatternDescription(pattern) {
        const descriptions = {
            daily: 'Codziennie',
            weekly: 'Co tydzień',
            biweekly: 'Co dwa tygodnie',
            monthly: 'Co miesiąc'
        };
        return descriptions[pattern] || pattern;
    }
    
    // Meeting Analytics
    setAnalyticsPeriod(period) {
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.displayMeetingAnalytics(period);
    }
    
    displayMeetingAnalytics(period = 'week') {
        const now = new Date();
        let startDate = new Date();
        
        switch (period) {
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }
        
        // Calculate statistics
        const periodMeetings = this.meetingsHistory.filter(m => 
            new Date(m.dateTime) >= startDate
        );
        
        const totalTime = periodMeetings.reduce((sum, m) => sum + m.duration, 0);
        const avgTime = periodMeetings.length > 0 ? Math.round(totalTime / periodMeetings.length) : 0;
        
        // Update displays
        document.getElementById('totalMeetingTime').textContent = `${Math.floor(totalTime / 60)}h ${totalTime % 60}m`;
        document.getElementById('avgMeetingTime').textContent = `${avgTime}m`;
        
        // Update charts
        this.updateMeetingCharts(periodMeetings);
    }
    
    // Enhanced Chat functionality
    toggleChat() {
        const chat = document.getElementById('globalChat');
        const isActive = chat.classList.toggle('active');
        
        if (isActive) {
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
                this.createAnonymousUser();
            }
        }
    }
    
    minimizeChat() {
        const chat = document.getElementById('globalChat');
        chat.classList.toggle('minimized');
        this.isMinimized.chat = !this.isMinimized.chat;
    }
    
    switchChatTab(tab) {
        // Update tabs
        document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update content
        document.querySelectorAll('.chat-content').forEach(c => c.classList.remove('active'));
        
        switch (tab) {
            case 'global':
                document.getElementById('globalChatContent').classList.add('active');
                break;
            case 'private':
                document.getElementById('privateChatContent').classList.add('active');
                this.updatePrivateUsersList();
                break;
            case 'rooms':
                document.getElementById('roomsChatContent').classList.add('active');
                this.loadChatRooms();
                break;
        }
    }
    
    // Fixed private users management - prevent duplicates
    updatePrivateUsersList() {
        const container = document.getElementById('privateUsersList');
        
        // Use Map to prevent duplicates
        const uniqueUsers = new Map();
        
        // Process online users first
        Object.entries(this.onlineUsers).forEach(([userId, presence]) => {
            if (userId !== this.firebaseUser?.uid && presence.user_info) {
                uniqueUsers.set(userId, {
                    userId,
                    name: presence.user_info.name || 'Użytkownik',
                    email: presence.user_info.email || '',
                    picture: presence.user_info.picture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
                    isOnline: true
                });
            }
        });
        
        // Then add offline users (without overwriting online ones)
        Object.entries(this.allUsers).forEach(([userId, userInfo]) => {
            if (userId !== this.firebaseUser?.uid && !uniqueUsers.has(userId)) {
                uniqueUsers.set(userId, {
                    userId,
                    name: userInfo.name || 'Użytkownik',
                    email: userInfo.email || '',
                    picture: userInfo.picture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
                    isOnline: false
                });
            }
        });
        
        if (uniqueUsers.size === 0) {
            container.innerHTML = '<p class="empty-state">Brak dostępnych użytkowników</p>';
            return;
        }
        
        // Convert Map to array and sort
        const usersList = Array.from(uniqueUsers.values()).sort((a, b) => {
            // Online users first
            if (a.isOnline && !b.isOnline) return -1;
            if (!a.isOnline && b.isOnline) return 1;
            // Then by name
            return a.name.localeCompare(b.name);
        });
        
        container.innerHTML = usersList.map(user => {
            const unreadCount = this.getUnreadPrivateMessages(user.userId);
            
            return `
                <div class="private-user-item" onclick="window.app.openPrivateChat('${user.userId}', '${this.escapeHtml(user.name)}', '${user.picture}')">
                    <img class="private-user-avatar" src="${user.picture}" alt="${this.escapeHtml(user.name)}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff'">
                    <div class="private-user-info">
                        <div class="private-user-name">${this.escapeHtml(user.name)}</div>
                        <div class="private-user-status ${user.isOnline ? 'online' : ''}">${user.isOnline ? 'Online' : 'Offline'}</div>
                    </div>
                    ${unreadCount > 0 ? `<span class="unread-count">${unreadCount}</span>` : ''}
                </div>
            `;
        }).join('');
    }
    
    filterPrivateUsers() {
        const query = document.getElementById('privateUsersSearch').value.toLowerCase();
        
        if (!query) {
            this.updatePrivateUsersList();
            return;
        }
        
        const container = document.getElementById('privateUsersList');
        const uniqueUsers = new Map();
        
        // Filter online users
        Object.entries(this.onlineUsers).forEach(([userId, presence]) => {
            if (userId !== this.firebaseUser?.uid && presence.user_info) {
                const name = presence.user_info.name || 'Użytkownik';
                const email = presence.user_info.email || '';
                if (name.toLowerCase().includes(query) || email.toLowerCase().includes(query)) {
                    uniqueUsers.set(userId, {
                        userId,
                        name,
                        email,
                        picture: presence.user_info.picture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
                        isOnline: true
                    });
                }
            }
        });
        
        // Filter offline users
        Object.entries(this.allUsers).forEach(([userId, userInfo]) => {
            if (userId !== this.firebaseUser?.uid && !uniqueUsers.has(userId)) {
                const name = userInfo.name || 'Użytkownik';
                const email = userInfo.email || '';
                if (name.toLowerCase().includes(query) || email.toLowerCase().includes(query)) {
                    uniqueUsers.set(userId, {
                        userId,
                        name,
                        email,
                        picture: userInfo.picture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
                        isOnline: false
                    });
                }
            }
        });
        
        if (uniqueUsers.size === 0) {
            container.innerHTML = '<p class="empty-state">Nie znaleziono użytkowników</p>';
            return;
        }
        
        const usersList = Array.from(uniqueUsers.values()).sort((a, b) => {
            if (a.isOnline && !b.isOnline) return -1;
            if (!a.isOnline && b.isOnline) return 1;
            return a.name.localeCompare(b.name);
        });
        
        container.innerHTML = usersList.map(user => {
            const unreadCount = this.getUnreadPrivateMessages(user.userId);
            
            return `
                <div class="private-user-item" onclick="window.app.openPrivateChat('${user.userId}', '${this.escapeHtml(user.name)}', '${user.picture}')">
                    <img class="private-user-avatar" src="${user.picture}" alt="${this.escapeHtml(user.name)}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff'">
                    <div class="private-user-info">
                        <div class="private-user-name">${this.escapeHtml(user.name)}</div>
                        <div class="private-user-status ${user.isOnline ? 'online' : ''}">${user.isOnline ? 'Online' : 'Offline'}</div>
                    </div>
                    ${unreadCount > 0 ? `<span class="unread-count">${unreadCount}</span>` : ''}
                </div>
            `;
        }).join('');
    }
    
    // Chat rooms
    loadChatRooms() {
        // TODO: Load actual chat rooms from Firebase
        const rooms = [
            { id: 'general', name: 'Ogólny', description: 'Rozmowy na każdy temat', users: 12, icon: 'fa-comments' },
            { id: 'productivity', name: 'Produktywność', description: 'Wskazówki i porady', users: 5, icon: 'fa-tasks' },
            { id: 'tech', name: 'Technologia', description: 'Dyskusje o technologii', users: 8, icon: 'fa-laptop-code' },
            { id: 'random', name: 'Losowe', description: 'Luźne rozmowy', users: 15, icon: 'fa-dice' },
            { id: 'help', name: 'Pomoc', description: 'Pytania i odpowiedzi', users: 3, icon: 'fa-question-circle' }
        ];
        
        const container = document.getElementById('roomsList');
        container.innerHTML = rooms.map(room => `
            <div class="room-item" onclick="window.app.joinRoom('${room.id}')">
                <i class="fas ${room.icon}"></i>
                <div class="room-info">
                    <h5>${room.name}</h5>
                    <p>${room.description}</p>
                </div>
                <span class="room-users">${room.users} online</span>
            </div>
        `).join('');
    }
    
    createChatRoom() {
        const name = prompt('Nazwa pokoju:');
        if (!name) return;
        
        const description = prompt('Opis pokoju:');
        const isPrivate = confirm('Czy pokój ma być prywatny?');
        
        // TODO: Create room in Firebase
        this.showNotification('Pokój utworzony!', 'success');
        this.loadChatRooms();
    }
    
    joinRoom(roomId) {
        this.currentRoom = roomId;
        this.showNotification(`Dołączono do pokoju: ${roomId}`, 'success');
        // TODO: Load room messages
    }
    
    // Enhanced message functionality
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
        
        // Show/hide buttons based on ownership and time
        const message = this.chatMessages.find(m => m.id === messageId);
        const isRecent = message && (Date.now() - message.timestamp) < 5 * 60 * 1000; // 5 minutes
        
        document.getElementById('deleteMessageBtn').style.display = isOwn ? 'flex' : 'none';
        document.getElementById('editMessageBtn').style.display = (isOwn && isRecent) ? 'flex' : 'none';
        
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
    
    // Reply functionality
    replyToMessage() {
        if (!this.selectedMessageId) return;
        
        const message = this.chatMessages.find(m => m.id === this.selectedMessageId);
        if (!message) return;
        
        this.replyToMessage = message;
        
        // Show reply preview
        const preview = document.getElementById('chatReplyPreview');
        preview.style.display = 'flex';
        document.getElementById('replyToText').textContent = `${message.userName}: ${message.content.substring(0, 50)}...`;
        
        // Focus input
        document.getElementById('chatInput').focus();
        
        // Hide context menu
        document.getElementById('messageContextMenu').style.display = 'none';
    }
    
    cancelReply() {
        this.replyToMessage = null;
        document.getElementById('chatReplyPreview').style.display = 'none';
    }
    
    // Edit message functionality
    editMessage() {
        if (!this.selectedMessageId) return;
        
        const message = this.chatMessages.find(m => m.id === this.selectedMessageId);
        if (!message || message.userId !== this.firebaseUser?.uid) return;
        
        // Check if message is recent (5 minutes)
        if (Date.now() - message.timestamp > 5 * 60 * 1000) {
            this.showNotification('Możesz edytować wiadomości tylko przez 5 minut', 'warning');
            return;
        }
        
        this.editingMessageId = message.id;
        
        // Show edit modal
        document.getElementById('editMessageModal').classList.add('active');
        document.getElementById('editMessageInput').value = message.content.replace(/<[^>]*>/g, ''); // Remove HTML
        document.getElementById('editMessageInput').focus();
        
        // Hide context menu
        document.getElementById('messageContextMenu').style.display = 'none';
    }
    
    closeEditModal() {
        document.getElementById('editMessageModal').classList.remove('active');
        this.editingMessageId = null;
    }
    
    async saveEditedMessage() {
        if (!this.editingMessageId || !this.firebaseUser || !this.isFirebaseReady) return;
        
        const newContent = document.getElementById('editMessageInput').value.trim();
        if (!newContent) return;
        
        try {
            const messageRef = window.firebase.ref(window.firebase.database, `chat/messages/${this.editingMessageId}`);
            await window.firebase.update(messageRef, {
                content: this.escapeHtml(newContent),
                edited: true,
                editedAt: Date.now()
            });
            
            this.showNotification('Wiadomość zaktualizowana', 'success');
            this.closeEditModal();
        } catch (error) {
            console.error('Error editing message:', error);
            this.showNotification('Błąd podczas edycji wiadomości', 'error');
        }
    }
    
    translateMessage() {
        if (!this.selectedMessageId) return;
        
        const message = this.chatMessages.find(m => m.id === this.selectedMessageId);
        if (!message) return;
        
        // TODO: Implement translation API
        this.showNotification('Funkcja tłumaczenia będzie dostępna wkrótce!', 'info');
        document.getElementById('messageContextMenu').style.display = 'none';
    }
    
    reportMessage() {
        if (!this.selectedMessageId) return;
        
        const reason = prompt('Podaj powód zgłoszenia:');
        if (!reason) return;
        
        // TODO: Implement reporting system
        this.showNotification('Wiadomość została zgłoszona. Dziękujemy!', 'success');
        document.getElementById('messageContextMenu').style.display = 'none';
    }
    
    // Emoji picker
    toggleEmojiPicker() {
        const picker = document.getElementById('emojiPicker');
        picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
    }
    
    showEmojiCategory(category) {
        // Update active tab
        document.querySelectorAll('.emoji-tab').forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        // Display emojis
        const grid = document.getElementById('emojiGrid');
        const emojis = this.emojiCategories[category] || [];
        
        grid.innerHTML = emojis.map(emoji => 
            `<span onclick="window.app.insertEmoji('${emoji}')">${emoji}</span>`
        ).join('');
    }
    
    insertEmoji(emoji) {
        const input = document.getElementById('chatInput') || document.getElementById('privateChatInput');
        if (input) {
            input.value += emoji;
            input.focus();
        }
        this.toggleEmojiPicker();
    }
    
    // File attachment
    attachFile() {
        // TODO: Implement file attachment
        this.showNotification('Funkcja załączników będzie dostępna wkrótce!', 'info');
    }
    
    // Enhanced message display
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
                        <i class="fas fa-check"></i>
                    </span>`;
                }
            }
            
            // Reply preview if this is a reply
            let replyHtml = '';
            if (msg.replyTo) {
                const originalMsg = this.chatMessages.find(m => m.id === msg.replyTo);
                if (originalMsg) {
                    replyHtml = `
                        <div class="message-reply-preview">
                            <i class="fas fa-reply"></i>
                            <span>${originalMsg.userName}: ${originalMsg.content.substring(0, 30)}...</span>
                        </div>
                    `;
                }
            }
            
            return `
                <div class="chat-message ${isOwn ? 'own' : ''}" data-message-id="${msg.id}">
                    ${!isOwn ? `
                        <img class="message-avatar" src="${msg.userPicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(msg.userName) + '&background=6366f1&color=fff'}" alt="${this.escapeHtml(msg.userName)}">
                    ` : ''}
                    <div class="message-bubble">
                        <div class="message-header">
                            <span class="message-author">${this.escapeHtml(msg.userName)}</span>
                            <span class="message-time">${time}</span>
                            ${msg.edited ? '<span class="message-edited">(edytowane)</span>' : ''}
                        </div>
                        ${replyHtml}
                        <div class="message-content">
                            ${msg.content}
                            ${readReceiptHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }
    
    // Enhanced send message
    async sendMessage(event) {
        event.preventDefault();
        
        const input = document.getElementById('chatInput');
        const content = input.value.trim();
        
        if (!content || content.length > 500) return;
        
        // Clear input immediately for better UX
        input.value = '';
        
        // Clear typing status
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.sendTypingStatus(false);
        }
        
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
        
        // Add reply info if replying
        if (this.replyToMessage) {
            message.replyTo = this.replyToMessage.id;
            this.cancelReply();
        }
        
        try {
            if (!this.firebaseUser) {
                throw new Error('No Firebase user available');
            }
            
            // Send to Firebase
            const chatRef = window.firebase.ref(window.firebase.database, 'chat/messages');
            const result = await window.firebase.push(chatRef, message);
            console.log('Message sent successfully, key:', result.key);
            
            // Add to recent activity
            this.addToRecentActivity('chat', `Wysłano wiadomość w czacie`, 'fa-comment');
            
            // Add points for engagement
            this.addPoints(1);
            
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
    
    // YouTube enhancements
    connectYouTubeAPI() {
        this.showNotification('Połączenie z YouTube API będzie dostępne wkrótce!', 'info');
        // TODO: Implement YouTube API connection
    }
    
    importWatchLater() {
        this.showNotification('Import playlisty "Zobacz później" będzie dostępny wkrótce!', 'info');
        // TODO: Implement watch later import
    }
    
    fetchVideoInfo() {
        const url = document.getElementById('videoUrl').value;
        if (!url) return;
        
        const videoId = this.extractVideoId(url);
        if (!videoId) {
            this.showNotification('Nieprawidłowy link YouTube', 'error');
            return;
        }
        
        // Simulate fetching video info
        // In real implementation, this would use YouTube API
        const videoInfo = {
            title: 'Przykładowy tytuł filmu',
            channel: 'Nazwa kanału',
            duration: '10:34',
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        };
        
        // Display video info
        document.getElementById('videoInfo').style.display = 'block';
        document.getElementById('videoThumbnail').src = videoInfo.thumbnail;
        document.getElementById('videoTitle').textContent = videoInfo.title;
        document.getElementById('videoChannel').textContent = videoInfo.channel;
        document.getElementById('videoDurationInfo').textContent = `Czas trwania: ${videoInfo.duration}`;
        
        // Set duration in minutes
        const durationParts = videoInfo.duration.split(':');
        const minutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
        document.getElementById('videoDuration').value = minutes;
    }
    
    async searchYouTube() {
        const query = document.getElementById('youtubeSearch').value;
        const searchType = document.querySelector('.search-type.active').dataset.type;
        const duration = document.getElementById('searchDuration').value;
        const sort = document.getElementById('searchSort').value;
        const upload = document.getElementById('searchUpload').value;
        
        if (!query) {
            this.showNotification('Wpisz frazę do wyszukania', 'warning');
            return;
        }
        
        // Show search status
        document.getElementById('youtubeSearchStatus').style.display = 'flex';
        
        // Simulate search - in real implementation would use YouTube API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Hide search status
        document.getElementById('youtubeSearchStatus').style.display = 'none';
        
        // Generate mock results
        const results = this.generateMockYouTubeResults(query, searchType);
        
        // Display results
        this.displayYouTubeSearchResults(results);
        
        // Add to search history
        this.addToSearchHistory(query);
        
        // Track search
        this.trackEvent('youtube_search', { query, type: searchType, filters: { duration, sort, upload } });
    }
    
    generateMockYouTubeResults(query, type) {
        const results = [];
        const count = Math.floor(Math.random() * 15) + 5;
        
        for (let i = 0; i < count; i++) {
            if (type === 'video') {
                results.push({
                    type: 'video',
                    id: `video_${Date.now()}_${i}`,
                    title: `${query} - Film ${i + 1}`,
                    channel: `Kanał ${Math.floor(Math.random() * 10) + 1}`,
                    views: Math.floor(Math.random() * 1000000),
                    duration: `${Math.floor(Math.random() * 30)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                    thumbnail: `https://picsum.photos/320/180?random=${i}`,
                    url: `https://youtube.com/watch?v=example${i}`
                });
            } else if (type === 'channel') {
                results.push({
                    type: 'channel',
                    id: `channel_${Date.now()}_${i}`,
                    name: `${query} Channel ${i + 1}`,
                    subscribers: Math.floor(Math.random() * 1000000),
                    videos: Math.floor(Math.random() * 1000),
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(query + i)}&background=random`,
                    url: `https://youtube.com/channel/example${i}`
                });
            } else if (type === 'playlist') {
                results.push({
                    type: 'playlist',
                    id: `playlist_${Date.now()}_${i}`,
                    title: `${query} - Playlista ${i + 1}`,
                    channel: `Kanał ${Math.floor(Math.random() * 10) + 1}`,
                    videos: Math.floor(Math.random() * 100) + 1,
                    thumbnail: `https://picsum.photos/320/180?random=${i}`,
                    url: `https://youtube.com/playlist?list=example${i}`
                });
            } else if (type === 'live') {
                results.push({
                    type: 'live',
                    id: `live_${Date.now()}_${i}`,
                    title: `🔴 ${query} - Transmisja na żywo ${i + 1}`,
                    channel: `Kanał ${Math.floor(Math.random() * 10) + 1}`,
                    viewers: Math.floor(Math.random() * 10000),
                    thumbnail: `https://picsum.photos/320/180?random=${i}`,
                    url: `https://youtube.com/watch?v=live${i}`
                });
            }
        }
        
        return results;
    }
    
    displayYouTubeSearchResults(results) {
        const container = document.getElementById('youtubeSearchResults');
        
        if (results.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak wyników wyszukiwania</p>';
            return;
        }
        
        container.innerHTML = results.map(result => {
            if (result.type === 'video') {
                return `
                    <div class="youtube-result-card video-card">
                        <div class="video-thumbnail">
                            <img src="${result.thumbnail}" alt="${this.escapeHtml(result.title)}">
                            <span class="video-duration">${result.duration}</span>
                        </div>
                        <div class="video-info">
                            <h4>${this.escapeHtml(result.title)}</h4>
                            <p class="video-channel">${this.escapeHtml(result.channel)}</p>
                            <p class="video-stats">${this.formatNumber(result.views)} wyświetleń</p>
                        </div>
                        <div class="video-actions">
                            <button onclick="window.app.watchVideo('${result.url}', '${this.escapeHtml(result.title)}', '${result.id}')" title="Oglądaj">
                                <i class="fas fa-play"></i>
                            </button>
                            <button onclick="window.app.addVideoToPlaylist('${result.url}', '${this.escapeHtml(result.title)}', '${result.duration}')" title="Dodaj do playlisty">
                                <i class="fas fa-list"></i>
                            </button>
                            <button onclick="window.app.setVideoTimer('${result.url}', '${this.escapeHtml(result.title)}', '${result.duration}')" title="Ustaw timer">
                                <i class="fas fa-clock"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else if (result.type === 'channel') {
                return `
                    <div class="youtube-result-card channel-card">
                        <img src="${result.avatar}" alt="${this.escapeHtml(result.name)}" class="channel-avatar">
                        <div class="channel-info">
                            <h4>${this.escapeHtml(result.name)}</h4>
                            <p>${this.formatNumber(result.subscribers)} subskrybentów</p>
                            <p>${result.videos} filmów</p>
                        </div>
                        <div class="channel-actions">
                            <button onclick="window.app.openChannel('${result.id}', '${this.escapeHtml(result.name)}')" title="Otwórz kanał">
                                <i class="fas fa-external-link-alt"></i>
                            </button>
                            <button onclick="window.app.addToFavorites('${result.id}', '${this.escapeHtml(result.name)}', ${result.subscribers})" title="Dodaj do ulubionych">
                                <i class="fas fa-star"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else if (result.type === 'playlist') {
                return `
                    <div class="youtube-result-card playlist-card">
                        <div class="playlist-thumbnail">
                            <img src="${result.thumbnail}" alt="${this.escapeHtml(result.title)}">
                            <span class="playlist-count">${result.videos} filmów</span>
                        </div>
                        <div class="playlist-info">
                            <h4>${this.escapeHtml(result.title)}</h4>
                            <p>${this.escapeHtml(result.channel)}</p>
                        </div>
                        <div class="playlist-actions">
                            <button onclick="window.open('${result.url}', '_blank')" title="Otwórz playlistę">
                                <i class="fas fa-external-link-alt"></i>
                            </button>
                            <button onclick="window.app.importPlaylist('${result.id}', '${this.escapeHtml(result.title)}')" title="Importuj">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else if (result.type === 'live') {
                return `
                    <div class="youtube-result-card live-card">
                        <div class="live-thumbnail">
                            <img src="${result.thumbnail}" alt="${this.escapeHtml(result.title)}">
                            <span class="live-badge">NA ŻYWO</span>
                        </div>
                        <div class="live-info">
                            <h4>${this.escapeHtml(result.title)}</h4>
                            <p>${this.escapeHtml(result.channel)}</p>
                            <p class="live-viewers">${this.formatNumber(result.viewers)} oglądających</p>
                        </div>
                        <div class="live-actions">
                            <button onclick="window.open('${result.url}', '_blank')" title="Oglądaj na żywo">
                                <i class="fas fa-broadcast-tower"></i>
                            </button>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }
    
    watchVideo(url, title, videoId) {
        window.open(url, '_blank');
        
        // Add to watch history
        this.addToWatchHistory({
            title,
            url,
            videoId,
            watchedAt: new Date().toISOString()
        });
        
        // Add to recent activity
        this.addToRecentActivity('video', `Obejrzano: ${title}`, 'fa-play-circle');
        
        // Add points
        this.addPoints(2);
    }
    
    addVideoToPlaylist(url, title, duration) {
        // Get available playlists
        const playlists = Object.entries(this.playlists);
        
        if (playlists.length === 0) {
            if (confirm('Nie masz żadnych playlist. Czy chcesz utworzyć nową?')) {
                this.createPlaylist();
            }
            return;
        }
        
        // Show playlist selector
        const playlistOptions = playlists.map(([id, playlist]) => 
            `${playlist.name} (${playlist.videos.length} filmów)`
        ).join('\n');
        
        const selectedIndex = prompt(`Wybierz playlistę:\n${playlistOptions}\n\nPodaj numer (1-${playlists.length}):`);
        
        if (!selectedIndex || isNaN(selectedIndex)) return;
        
        const index = parseInt(selectedIndex) - 1;
        if (index < 0 || index >= playlists.length) return;
        
        const [playlistId, playlist] = playlists[index];
        
        // Parse duration
        const durationParts = duration.split(':');
        const durationMinutes = durationParts.length === 2 
            ? parseInt(durationParts[0]) * 60 + parseInt(durationParts[1])
            : parseInt(duration);
        
        // Add video to playlist
        playlist.videos.push({
            url,
            title,
            duration: durationMinutes,
            addedAt: new Date().toISOString()
        });
        
        this.saveToStorage('playlists', this.playlists);
        this.showNotification(`Film dodany do playlisty "${playlist.name}"`, 'success');
        this.displayPlaylists();
    }
    
    setVideoTimer(url, title, duration) {
        // Populate timer form
        document.getElementById('videoUrl').value = url;
        
        // Parse duration
        const durationParts = duration.split(':');
        const durationMinutes = durationParts.length === 2 
            ? parseInt(durationParts[0]) * 60 + parseInt(durationParts[1])
            : parseInt(duration);
        
        document.getElementById('videoDuration').value = durationMinutes;
        
        // Set time to 5 minutes from now
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        
        document.getElementById('videoDate').value = now.toISOString().split('T')[0];
        document.getElementById('videoTime').value = now.toTimeString().substring(0, 5);
        
        // Switch to timer tab
        this.showYouTubeTab('timer');
        
        this.showNotification('Ustaw czas rozpoczęcia i kliknij "Rozpocznij odliczanie"', 'info');
    }
    
    importPlaylist(playlistId, playlistName) {
        this.showNotification('Import playlist YouTube będzie dostępny wkrótce!', 'info');
        // TODO: Implement playlist import via YouTube API
    }
    
    // Recommendations
    loadRecommendations(category = 'all') {
        // Update active category
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Simulate loading recommendations
        const container = document.getElementById('recommendationsList');
        container.innerHTML = '<p class="empty-state">Ładowanie rekomendacji...</p>';
        
        setTimeout(() => {
            const recommendations = this.generateRecommendations(category);
            this.displayRecommendations(recommendations);
        }, 1000);
    }
    
    generateRecommendations(category) {
        const recommendations = [];
        const count = 12;
        
        const categories = {
            all: ['Muzyka', 'Gaming', 'Edukacja', 'Technologia', 'Vlog', 'Sport'],
            music: ['Pop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Hip-Hop'],
            gaming: ['Let\'s Play', 'Tutorial', 'Review', 'Esports', 'Speedrun', 'Indie'],
            education: ['Nauka', 'Historia', 'Matematyka', 'Języki', 'Programowanie', 'DIY'],
            tech: ['Review', 'Unboxing', 'Tutorial', 'News', 'Coding', 'Gadgets']
        };
        
        const subcategories = categories[category] || categories.all;
        
        for (let i = 0; i < count; i++) {
            const subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
            recommendations.push({
                id: `rec_${Date.now()}_${i}`,
                title: `${subcategory} - Rekomendowany film ${i + 1}`,
                channel: `Kanał ${subcategory}`,
                views: Math.floor(Math.random() * 1000000),
                duration: `${Math.floor(Math.random() * 30)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                thumbnail: `https://picsum.photos/320/180?random=${category}_${i}`,
                url: `https://youtube.com/watch?v=rec_${i}`,
                match: Math.floor(Math.random() * 30) + 70 // 70-100% match
            });
        }
        
        // Sort by match percentage
        recommendations.sort((a, b) => b.match - a.match);
        
        return recommendations;
    }
    
    displayRecommendations(recommendations) {
        const container = document.getElementById('recommendationsList');
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="rec-thumbnail">
                    <img src="${rec.thumbnail}" alt="${this.escapeHtml(rec.title)}">
                    <span class="rec-duration">${rec.duration}</span>
                    <span class="rec-match">${rec.match}% dopasowanie</span>
                </div>
                <div class="rec-info">
                    <h4>${this.escapeHtml(rec.title)}</h4>
                    <p>${this.escapeHtml(rec.channel)}</p>
                    <p class="rec-views">${this.formatNumber(rec.views)} wyświetleń</p>
                </div>
                <div class="rec-actions">
                    <button onclick="window.app.watchVideo('${rec.url}', '${this.escapeHtml(rec.title)}', '${rec.id}')" title="Oglądaj">
                        <i class="fas fa-play"></i>
                    </button>
                    <button onclick="window.app.dismissRecommendation('${rec.id}')" title="Nie interesuje mnie">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    dismissRecommendation(recId) {
        // TODO: Store dismissed recommendations to improve future suggestions
        const card = event.target.closest('.recommendation-card');
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
        this.showNotification('Rekomendacja ukryta', 'success');
    }
    
    // YouTube Stats
    updateYouTubeStats() {
        // Calculate total watch time
        let totalMinutes = 0;
        this.watchHistory.forEach(video => {
            // Estimate 10 minutes per video if duration not stored
            totalMinutes += video.duration || 10;
        });
        
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        document.getElementById('totalWatchTime').textContent = `${hours}h ${minutes}m`;
        
        // Calculate watch streak
        const streak = this.calculateWatchStreak();
        document.getElementById('watchStreak').textContent = streak;
        
        // Videos watched
        document.getElementById('videosWatched').textContent = this.watchHistory.length;
        
        // Favorite genre (based on tags/categories)
        const genre = this.calculateFavoriteGenre();
        document.getElementById('favoriteGenre').textContent = genre;
        
        // Update charts
        this.updateYouTubeCharts();
    }
    
    calculateWatchStreak() {
        if (this.watchHistory.length === 0) return 0;
        
        const dates = this.watchHistory.map(v => new Date(v.watchedAt).toDateString());
        const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
        
        let streak = 0;
        const today = new Date();
        let checkDate = new Date(today);
        
        for (let i = 0; i < uniqueDates.length; i++) {
            const watchDate = new Date(uniqueDates[i]);
            const daysDiff = Math.floor((checkDate - watchDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === 0 || daysDiff === 1) {
                streak++;
                checkDate = watchDate;
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    calculateFavoriteGenre() {
        // This would analyze video titles/tags in real implementation
        const genres = ['Edukacja', 'Rozrywka', 'Muzyka', 'Gaming', 'Technologia'];
        return genres[Math.floor(Math.random() * genres.length)];
    }
    
    // Charts initialization
    initCharts() {
        // Initialize Chart.js charts when needed
        this.charts = {
            weeklyWatch: null,
            categories: null,
            meetingTime: null,
            popularHours: null,
            meetingTypes: null,
            progress: null
        };
    }
    
    updateYouTubeCharts() {
        // Weekly watch chart
        const weeklyCtx = document.getElementById('weeklyWatchChart');
        if (weeklyCtx && weeklyCtx.getContext) {
            this.updateWeeklyWatchChart(weeklyCtx.getContext('2d'));
        }
        
        // Categories chart
        const categoriesCtx = document.getElementById('categoriesChart');
        if (categoriesCtx && categoriesCtx.getContext) {
            this.updateCategoriesChart(categoriesCtx.getContext('2d'));
        }
    }
    
    updateWeeklyWatchChart(ctx) {
        const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
        const data = days.map(() => Math.floor(Math.random() * 120)); // Mock data
        
        if (this.charts.weeklyWatch) {
            this.charts.weeklyWatch.destroy();
        }
        
        this.charts.weeklyWatch = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Minuty oglądania',
                    data: data,
                    backgroundColor: '#6366f1',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    updateCategoriesChart(ctx) {
        const categories = ['Edukacja', 'Rozrywka', 'Muzyka', 'Gaming', 'Technologia'];
        const data = categories.map(() => Math.floor(Math.random() * 30)); // Mock data
        
        if (this.charts.categories) {
            this.charts.categories.destroy();
        }
        
        this.charts.categories = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#ec4899',
                        '#f59e0b',
                        '#10b981'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    updateMeetingCharts(meetings) {
        // Meeting time chart
        const timeCtx = document.getElementById('meetingTimeChart');
        if (timeCtx && timeCtx.getContext) {
            this.updateMeetingTimeChart(timeCtx.getContext('2d'), meetings);
        }
        
        // Popular hours chart
        const hoursCtx = document.getElementById('popularHoursChart');
        if (hoursCtx && hoursCtx.getContext) {
            this.updatePopularHoursChart(hoursCtx.getContext('2d'), meetings);
        }
        
        // Meeting types chart
        const typesCtx = document.getElementById('meetingTypesChart');
        if (typesCtx && typesCtx.getContext) {
            this.updateMeetingTypesChart(typesCtx.getContext('2d'), meetings);
        }
    }
    
    updateMeetingTimeChart(ctx, meetings) {
        // Group meetings by day
        const daysData = Array(7).fill(0);
        meetings.forEach(meeting => {
            const day = new Date(meeting.dateTime).getDay();
            daysData[day] += meeting.duration;
        });
        
        // Rearrange to start from Monday
        const reorderedData = [...daysData.slice(1), daysData[0]];
        const days = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
        
        if (this.charts.meetingTime) {
            this.charts.meetingTime.destroy();
        }
        
        this.charts.meetingTime = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Czas spotkań (minuty)',
                    data: reorderedData,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    updatePopularHoursChart(ctx, meetings) {
        // Group meetings by hour
        const hoursData = Array(24).fill(0);
        meetings.forEach(meeting => {
            const hour = new Date(meeting.dateTime).getHours();
            hoursData[hour]++;
        });
        
        // Show only hours with meetings
        const labels = [];
        const data = [];
        hoursData.forEach((count, hour) => {
            if (count > 0) {
                labels.push(`${hour}:00`);
                data.push(count);
            }
        });
        
        if (this.charts.popularHours) {
            this.charts.popularHours.destroy();
        }
        
        this.charts.popularHours = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Liczba spotkań',
                    data: data,
                    backgroundColor: '#10b981'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    updateMeetingTypesChart(ctx, meetings) {
        // Group by tags
        const tagCounts = {};
        meetings.forEach(meeting => {
            if (meeting.tags) {
                meeting.tags.split(',').forEach(tag => {
                    tag = tag.trim();
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            } else {
                tagCounts['Bez tagów'] = (tagCounts['Bez tagów'] || 0) + 1;
            }
        });
        
        // Get top 5 tags
        const sortedTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        if (this.charts.meetingTypes) {
            this.charts.meetingTypes.destroy();
        }
        
        this.charts.meetingTypes = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: sortedTags.map(([tag]) => tag),
                datasets: [{
                    data: sortedTags.map(([, count]) => count),
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#ec4899',
                        '#f59e0b',
                        '#10b981'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    updateProgressChart() {
        const ctx = document.getElementById('progressCanvas');
        if (!ctx || !ctx.getContext) return;
        
        // Get last 7 days data
        const days = [];
        const meetingsData = [];
        const videosData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            const dayStr = date.toLocaleDateString(this.settings.region, { weekday: 'short' });
            days.push(dayStr);
            
            // Count meetings for this day
            const dayMeetings = this.meetings.filter(m => 
                new Date(m.dateTime).toDateString() === date.toDateString()
            ).length;
            meetingsData.push(dayMeetings);
            
            // Count videos for this day
            const dayVideos = this.watchHistory.filter(v => 
                new Date(v.watchedAt).toDateString() === date.toDateString()
            ).length;
            videosData.push(dayVideos);
        }
        
        if (this.charts.progress) {
            this.charts.progress.destroy();
        }
        
        this.charts.progress = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Spotkania',
                        data: meetingsData,
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Filmy',
                        data: videosData,
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    // Typing indicator
    handleChatTyping() {
        if (!this.firebaseUser || !this.isFirebaseReady || !this.settings.showTypingIndicator) return;
        
        // Clear previous timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Send typing status
        this.sendTypingStatus(true);
        
        // Stop typing after 3 seconds of inactivity
        this.typingTimeout = setTimeout(() => {
            this.sendTypingStatus(false);
        }, 3000);
    }
    
    sendTypingStatus(isTyping) {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        const typingRef = window.firebase.ref(
            window.firebase.database,
            `chat/typing/${this.firebaseUser.uid}`
        );
        
        if (isTyping) {
            window.firebase.set(typingRef, {
                userName: this.currentUser.name,
                timestamp: Date.now()
            });
        } else {
            window.firebase.remove(typingRef);
        }
    }
    
    listenToTypingStatus() {
        if (!this.isFirebaseReady) return;
        
        const typingRef = window.firebase.ref(window.firebase.database, 'chat/typing');
        
        window.firebase.onValue(typingRef, (snapshot) => {
            const typingUsers = [];
            const now = Date.now();
            
            snapshot.forEach((userSnapshot) => {
                const userId = userSnapshot.key;
                const data = userSnapshot.val();
                
                // Ignore own typing and old statuses (older than 5 seconds)
                if (userId !== this.firebaseUser?.uid && (now - data.timestamp) < 5000) {
                    typingUsers.push(data.userName);
                }
            });
            
            this.updateTypingIndicator(typingUsers);
        });
    }
    
    updateTypingIndicator(typingUsers) {
        const indicator = document.getElementById('chatTyping');
        const usersElement = document.getElementById('typingUsers');
        
        if (typingUsers.length === 0) {
            indicator.style.display = 'none';
            return;
        }
        
        indicator.style.display = 'flex';
        
        if (typingUsers.length === 1) {
            usersElement.textContent = `${typingUsers[0]} pisze...`;
        } else if (typingUsers.length === 2) {
            usersElement.textContent = `${typingUsers[0]} i ${typingUsers[1]} piszą...`;
        } else {
            usersElement.textContent = `${typingUsers[0]} i ${typingUsers.length - 1} innych piszą...`;
        }
    }
    
    // Experimental features
    toggleExperimentalFeatures() {
        this.settings.enableExperimentalFeatures = document.getElementById('enableExperimentalFeatures').checked;
        this.saveSettings();
        
        if (this.settings.enableExperimentalFeatures) {
            this.showNotification('Funkcje eksperymentalne włączone! 🚀', 'success');
            this.enableExperimentalFeatures();
        } else {
            this.showNotification('Funkcje eksperymentalne wyłączone', 'info');
            this.disableExperimentalFeatures();
        }
    }
    
    enableExperimentalFeatures() {
        // Add experimental features UI elements
        // TODO: Implement experimental features
    }
    
    disableExperimentalFeatures() {
        // Remove experimental features UI elements
        // TODO: Remove experimental features
    }
    
    // Google Drive backup
    async backupToGoogle() {
        this.showNotification('Kopia zapasowa na Google Drive będzie dostępna wkrótce!', 'info');
        // TODO: Implement Google Drive backup using Google Drive API
    }
    
    // Haptic feedback
    toggleHapticFeedback() {
        this.settings.hapticFeedback = document.getElementById('enableHapticFeedback').checked;
        this.saveSettings();
    }
    
    triggerHaptic(type = 'light') {
        if (!this.settings.hapticFeedback || !('vibrate' in navigator)) return;
        
        const patterns = {
            light: [10],
            medium: [20],
            heavy: [30],
            success: [10, 50, 10],
            warning: [20, 100, 20],
            error: [50, 100, 50]
        };
        
        navigator.vibrate(patterns[type] || patterns.light);
    }
    
    // Show about dialog
    showAbout() {
        const content = `
            <div class="about-content">
                <div class="about-logo">
                    <i class="fas fa-clock"></i>
                </div>
                <h2>Timer Hub Pro</h2>
                <p class="version">Wersja 2.0.0</p>
                <p class="description">
                    Zaawansowana aplikacja do zarządzania czasem, spotkaniami i oglądaniem filmów.
                </p>
                <div class="about-features">
                    <h4>Główne funkcje:</h4>
                    <ul>
                        <li>Zarządzanie spotkaniami Microsoft Teams</li>
                        <li>Integracja z YouTube</li>
                        <li>Chat globalny i prywatny</li>
                        <li>System timerów i Pomodoro</li>
                        <li>Asystent AI</li>
                        <li>Synchronizacja w chmurze</li>
                        <li>System osiągnięć i gamifikacji</li>
                    </ul>
                </div>
                <div class="about-credits">
                    <p>Stworzone z ❤️ przez Piotr20111</p>
                    <p class="copyright">© 2025 Timer Hub Pro. Wszelkie prawa zastrzeżone.</p>
                </div>
                <div class="about-links">
                    <a href="#" onclick="window.app.showChangelog()">
                        <i class="fas fa-list"></i> Dziennik zmian
                    </a>
                    <a href="#" onclick="window.app.showPrivacyPolicy()">
                        <i class="fas fa-shield-alt"></i> Polityka prywatności
                    </a>
                    <a href="#" onclick="window.app.showSupport()">
                        <i class="fas fa-life-ring"></i> Wsparcie
                    </a>
                </div>
            </div>
        `;
        
        this.showModal('O aplikacji', content, 'about-modal');
    }
    
    showChangelog() {
        const content = `
            <div class="changelog">
                <h4>Wersja 2.0.0 (04.07.2025)</h4>
                <ul>
                    <li>🎯 Nowy system zarządzania spotkaniami Teams</li>
                    <li>🤖 Rozbudowany asystent AI</li>
                    <li>💬 Ulepszone funkcje czatu (edycja, odpowiedzi)</li>
                    <li>📊 Zaawansowane statystyki i wykresy</li>
                    <li>🎮 System osiągnięć i poziomów</li>
                    <li>📱 Lepsza responsywność</li>
                    <li>🔍 Ulepszone wyszukiwanie</li>
                    <li>🎨 Nowe motywy i personalizacja</li>
                    <li>🐛 Naprawiono problem z duplikowaniem użytkowników</li>
                    <li>⚡ Optymalizacja wydajności</li>
                </ul>
                
                <h4>Wersja 1.5.0</h4>
                <ul>
                    <li>Dodano tryb Pomodoro</li>
                    <li>Integracja z Firebase</li>
                    <li>System tagów</li>
                    <li>Playlisty YouTube</li>
                </ul>
            </div>
        `;
        
        this.showModal('Dziennik zmian', content);
    }
    
    showPrivacyPolicy() {
        const content = `
            <div class="privacy-policy">
                <h4>Polityka prywatności</h4>
                <p>Timer Hub Pro szanuje Twoją prywatność.</p>
                
                <h5>Dane które zbieramy:</h5>
                <ul>
                    <li>Informacje z konta Google (nazwa, email, zdjęcie)</li>
                    <li>Historia spotkań i oglądanych filmów</li>
                    <li>Preferencje i ustawienia</li>
                    <li>Wiadomości czatu</li>
                </ul>
                
                <h5>Jak używamy danych:</h5>
                <ul>
                    <li>Do synchronizacji między urządzeniami</li>
                    <li>Do personalizacji doświadczenia</li>
                    <li>Do generowania statystyk</li>
                    <li>Do komunikacji między użytkownikami</li>
                </ul>
                
                <h5>Bezpieczeństwo:</h5>
                <ul>
                    <li>Dane są szyfrowane podczas transmisji</li>
                    <li>Dostęp tylko po zalogowaniu</li>
                    <li>Możliwość usunięcia wszystkich danych</li>
                    <li>Nie udostępniamy danych osobom trzecim</li>
                </ul>
            </div>
        `;
        
        this.showModal('Polityka prywatności', content);
    }
    
    showSupport() {
        const content = `
            <div class="support">
                <h4>Centrum wsparcia</h4>
                
                <div class="support-options">
                    <div class="support-option">
                        <i class="fas fa-book"></i>
                        <h5>Dokumentacja</h5>
                        <p>Szczegółowe instrukcje i poradniki</p>
                        <button onclick="window.app.showDocumentation()">Otwórz</button>
                    </div>
                    
                    <div class="support-option">
                        <i class="fas fa-question-circle"></i>
                        <h5>FAQ</h5>
                        <p>Najczęściej zadawane pytania</p>
                        <button onclick="window.app.showFAQ()">Zobacz</button>
                    </div>
                    
                    <div class="support-option">
                        <i class="fas fa-envelope"></i>
                        <h5>Kontakt</h5>
                        <p>Napisz do nas</p>
                        <button onclick="window.app.showContact()">Kontakt</button>
                    </div>
                    
                    <div class="support-option">
                        <i class="fas fa-bug"></i>
                        <h5>Zgłoś błąd</h5>
                        <p>Pomóż nam ulepszyć aplikację</p>
                        <button onclick="window.app.reportBug()">Zgłoś</button>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal('Wsparcie', content);
    }
    
    showDocumentation() {
        window.open('https://github.com/Piotr20111/timer-hub-pro/wiki', '_blank');
    }
    
    showFAQ() {
        const content = `
            <div class="faq">
                <div class="faq-item">
                    <h5>Jak dodać spotkanie Teams?</h5>
                    <p>Kliknij "Microsoft Teams" → "Nowe spotkanie" → wypełnij formularz → "Rozpocznij odliczanie"</p>
                </div>
                
                <div class="faq-item">
                    <h5>Czy moje dane są bezpieczne?</h5>
                    <p>Tak, wszystkie dane są szyfrowane i przechowywane bezpiecznie w Firebase.</p>
                </div>
                
                <div class="faq-item">
                    <h5>Jak zmienić avatar?</h5>
                    <p>Kliknij na swoje zdjęcie profilowe w prawym górnym rogu.</p>
                </div>
                
                <div class="faq-item">
                    <h5>Co to jest tryb Pomodoro?</h5>
                    <p>Technika zarządzania czasem: 25 minut pracy, 5 minut przerwy.</p>
                </div>
                
                <div class="faq-item">
                    <h5>Jak eksportować dane?</h5>
                    <p>Ustawienia → Zarządzanie danymi → Eksportuj dane</p>
                </div>
            </div>
        `;
        
        this.showModal('Często zadawane pytania', content);
    }
    
    showContact() {
        const content = `
            <div class="contact-form">
                <p>Masz pytanie lub sugestię? Napisz do nas!</p>
                
                <form onsubmit="window.app.sendContactForm(event)">
                    <div class="form-group">
                        <label>Temat</label>
                        <input type="text" id="contactSubject" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Wiadomość</label>
                        <textarea id="contactMessage" rows="5" required></textarea>
                    </div>
                    
                    <button type="submit" class="submit-button">
                        <i class="fas fa-paper-plane"></i> Wyślij
                    </button>
                </form>
            </div>
        `;
        
        this.showModal('Kontakt', content);
    }
    
    sendContactForm(event) {
        event.preventDefault();
        
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // TODO: Implement actual email sending
        this.showNotification('Wiadomość wysłana! Odpowiemy jak najszybciej.', 'success');
        this.closeAllModals();
    }
    
    reportBug() {
        const content = `
            <div class="bug-report">
                <p>Znalazłeś błąd? Pomóż nam go naprawić!</p>
                
                <form onsubmit="window.app.sendBugReport(event)">
                    <div class="form-group">
                        <label>Co się stało?</label>
                        <input type="text" id="bugTitle" placeholder="Krótki opis problemu" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Kroki do odtworzenia</label>
                        <textarea id="bugSteps" rows="3" placeholder="1. Kliknąłem w...
2. Potem...
3. Błąd pojawił się gdy..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Oczekiwane zachowanie</label>
                        <textarea id="bugExpected" rows="2" placeholder="Co powinno się stać?" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Dodatkowe informacje</label>
                        <textarea id="bugAdditional" rows="2" placeholder="Przeglądarka, system operacyjny, itp."></textarea>
                    </div>
                    
                    <button type="submit" class="submit-button">
                        <i class="fas fa-bug"></i> Zgłoś błąd
                    </button>
                </form>
            </div>
        `;
        
        this.showModal('Zgłoś błąd', content);
    }
    
    sendBugReport(event) {
        event.preventDefault();
        
        const bugData = {
            title: document.getElementById('bugTitle').value,
            steps: document.getElementById('bugSteps').value,
            expected: document.getElementById('bugExpected').value,
            additional: document.getElementById('bugAdditional').value,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        };
        
        // TODO: Send to bug tracking system
        console.log('Bug report:', bugData);
        
        this.showNotification('Dziękujemy za zgłoszenie! Zajmiemy się tym jak najszybciej.', 'success');
        this.closeAllModals();
    }
    
    // Show stats modal
    showStats() {
        const content = `
            <div class="stats-dashboard">
                <div class="stats-header">
                    <h3>Twoje statystyki</h3>
                    <select onchange="window.app.changeStatsPeriod(this.value)">
                        <option value="week">Ten tydzień</option>
                        <option value="month">Ten miesiąc</option>
                        <option value="year">Ten rok</option>
                        <option value="all">Wszystkie</option>
                    </select>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card large">
                        <h4>Aktywność w czasie</h4>
                        <canvas id="activityChart"></canvas>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-trophy"></i>
                        <div class="stat-content">
                            <span class="stat-value">${this.userStats.points}</span>
                            <span class="stat-label">Punktów</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-layer-group"></i>
                        <div class="stat-content">
                            <span class="stat-value">${this.userStats.level}</span>
                            <span class="stat-label">Poziom</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-fire"></i>
                        <div class="stat-content">
                            <span class="stat-value">${this.userStats.streak}</span>
                            <span class="stat-label">Dni z rzędu</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-medal"></i>
                        <div class="stat-content">
                            <span class="stat-value">${Object.keys(this.achievements).length}</span>
                            <span class="stat-label">Osiągnięć</span>
                        </div>
                    </div>
                    
                    <div class="stat-card large">
                        <h4>Podział czasu</h4>
                        <canvas id="timeDistributionChart"></canvas>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <div class="stat-content">
                            <span class="stat-value">${this.meetings.length + this.meetingsHistory.length}</span>
                            <span class="stat-label">Wszystkich spotkań</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-play-circle"></i>
                        <div class="stat-content">
                            <span class="stat-value">${this.watchHistory.length}</span>
                            <span class="stat-label">Filmów obejrzanych</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-tasks"></i>
                        <div class="stat-content">
                            <span class="stat-value">${this.tasks.filter(t => t.completed).length}</span>
                            <span class="stat-label">Zadań ukończonych</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <i class="fas fa-seedling"></i>
                        <div class="stat-content">
                            <span class="stat-value">${this.pomodoroSessions}</span>
                            <span class="stat-label">Sesji Pomodoro</span>
                        </div>
                    </div>
                </div>
                
                <div class="stats-achievements">
                    <h4>Ostatnie osiągnięcia</h4>
                    <div class="achievements-list">
                        ${Object.entries(this.achievements).slice(-3).map(([id, achievement]) => `
                            <div class="achievement-item">
                                <i class="fas ${achievement.icon}"></i>
                                <div>
                                    <strong>${achievement.name}</strong>
                                    <p>${achievement.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        this.showModal('Statystyki', content, 'stats-modal large');
        
        // Initialize charts
        setTimeout(() => {
            this.initStatsCharts();
        }, 100);
    }
    
    initStatsCharts() {
        // Activity chart
        const activityCtx = document.getElementById('activityChart');
        if (activityCtx && activityCtx.getContext) {
            this.createActivityChart(activityCtx.getContext('2d'));
        }
        
        // Time distribution chart
        const distributionCtx = document.getElementById('timeDistributionChart');
        if (distributionCtx && distributionCtx.getContext) {
            this.createTimeDistributionChart(distributionCtx.getContext('2d'));
        }
    }
    
    createActivityChart(ctx) {
        const last7Days = [];
        const activityData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            last7Days.push(date.toLocaleDateString(this.settings.region, { weekday: 'short' }));
            
            // Count activities for this day
            let count = 0;
            const dateStr = date.toDateString();
            
            count += this.meetings.filter(m => new Date(m.dateTime).toDateString() === dateStr).length;
            count += this.watchHistory.filter(v => new Date(v.watchedAt).toDateString() === dateStr).length;
            count += this.tasks.filter(t => t.completed && new Date(t.completedAt).toDateString() === dateStr).length;
            
            activityData.push(count);
        }
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Aktywności',
                    data: activityData,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    createTimeDistributionChart(ctx) {
        const totalMeetingTime = this.meetingsHistory.reduce((sum, m) => sum + m.duration, 0);
        const totalVideoTime = this.watchHistory.length * 15; // Estimate 15 min per video
        const totalPomodoroTime = this.pomodoroSessions * 25;
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Spotkania', 'Filmy', 'Pomodoro', 'Inne'],
                datasets: [{
                    data: [totalMeetingTime, totalVideoTime, totalPomodoroTime, 60],
                    backgroundColor: [
                        '#6366f1',
                        '#ec4899',
                        '#10b981',
                        '#94a3b8'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    changeStatsPeriod(period) {
        // TODO: Update stats based on selected period
        this.showNotification(`Statystyki dla okresu: ${period}`, 'info');
    }
    
    // Cleanup
    cleanup() {
        // Clear all intervals
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.pomodoroInterval) clearInterval(this.pomodoroInterval);
        if (this.focusInterval) clearInterval(this.focusInterval);
        if (this.autoBreakTimeout) clearTimeout(this.autoBreakTimeout);
        if (this.sessionTimeout) clearTimeout(this.sessionTimeout);
        if (this.typingTimeout) clearTimeout(this.typingTimeout);
        
        // Destroy charts
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        
        // Set offline status
        if (this.presenceRef && this.isFirebaseReady) {
            window.firebase.set(this.presenceRef, {
                state: 'offline',
                last_changed: window.firebase.serverTimestamp()
            });
        }
    }
    
    // Error handling
    handleError(error, context = 'General') {
        console.error(`[${context}] Error:`, error);
        
        if (this.debugMode) {
            this.showNotification(`[${context}] ${error.message}`, 'error');
        } else {
            this.showNotification('Wystąpił błąd. Spróbuj ponownie.', 'error');
        }
        
        // Track error
        this.trackEvent('error_occurred', {
            context,
            message: error.message,
            stack: error.stack
        });
    }
    
    // Performance monitoring
    measurePerformance(name, fn) {
        if (!this.debugMode) {
            return fn();
        }
        
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
        
        return result;
    }
    
    // App initialization wrapper
    async initialize() {
        try {
            console.log('Timer Hub Pro starting...');
            
            // Check browser compatibility
            if (!this.checkBrowserCompatibility()) {
                this.showNotification('Twoja przeglądarka może nie obsługiwać wszystkich funkcji', 'warning');
            }
            
            // Initialize app
            this.init();
            
            // Update displays
            this.updateTodaySchedule();
            this.updateProgressChart();
            this.updateYouTubeStats();
            
            // Set up periodic updates
            setInterval(() => {
                this.updateTodaySchedule();
                this.updateStats();
            }, 60000); // Every minute
            
            console.log('Timer Hub Pro initialized successfully');
            
        } catch (error) {
            this.handleError(error, 'Initialization');
        }
    }
    
    checkBrowserCompatibility() {
        const features = [
            'localStorage' in window,
            'Notification' in window,
            'serviceWorker' in navigator,
            'firebase' in window
        ];
        
        return features.every(feature => feature);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide login screen by default
    document.getElementById('loginScreen').style.display = 'none';
    
    // Create app instance
    window.app = new TimerHub();
    
    // Initialize app
    window.app.initialize();
});

// Handle page unload
window.addEventListener('beforeunload', (e) => {
    // Save current state
    if (window.app) {
        // Warn about active timer
        if (window.app.currentTimer) {
            e.preventDefault();
            e.returnValue = 'Masz aktywny timer. Czy na pewno chcesz opuścić stronę?';
        }
        
        // Cleanup
        window.app.cleanup();
    }
});

// Service Worker for offline functionality and PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registered:', registration);
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

// Handle errors globally
window.addEventListener('error', (e) => {
    if (window.app) {
        window.app.handleError(e.error, 'Global');
    }
});

// Handle promise rejections
window.addEventListener('unhandledrejection', (e) => {
    if (window.app) {
        window.app.handleError(new Error(e.reason), 'Promise');
    }
});
