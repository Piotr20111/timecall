// Timer Hub Application with Enhanced Features
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
        this.notificationSounds = {
            default: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFK3/K8N+SUgslUqPc79qtWxULN3y718m7cisgBCl6w+vap1oWCjpzuebOrWIbByNzv+vest...',
            bell: 'data:audio/wav;base64,UklGRhYGAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YfIFAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz+a2vLDcyYELIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiS1/HMeS0GKnzJ8N+RUAsmUqPc79qtWxULN3y718m7cisgBCl6w+vap1oWCjpzuebOrWIbByNzv+vest...',
            chime: 'data:audio/wav;base64,UklGRhQGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ8GAABiYGRhVVNeaGJXS0hRXntqWkI5RFK7tnVNMTE0kt/epm0kDStVx/Xku2sdBzuY5fzSsSUEJXjP+eOILAUkeMrz5KNYKCpUnODyy5NWIBcwbMnm989sFQcnWqTd8tCHPhQoQ47k+eSfTBgmPHXA5v3zvmAYDj53qeP14qtOGClBeKrl/f/+6JJFGDNiodL49/bKfToVLlN6u+jy99CkWygeOl13vuLx99...',
            pop: 'data:audio/wav;base64,UklGRjAGAABXQVZFZm10IBAAAAABAAEAESsAABErAAABAAgAZGF0YfwFAABhYWJjZGVmaGlqa2xtbnBxcnN0dXZ3eHl6e3x9fn6AgYKDhIWGiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==',
            none: null
        };
        this.debugMode = false;
        
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
            compactMode: false,
            notificationSound: 'default',
            enablePomodoro: false,
            pomodoroWork: 25,
            pomodoroBreak: 5,
            enableAutoBreak: false,
            enableAnalytics: true,
            enableKeyboardShortcuts: true,
            enableDarkModeSched: false
        };
        
        // Security measures
        this.initSecurityMeasures();
        
        // Load settings
        this.loadSettings();
        
        // Initialize keyboard shortcuts
        this.initKeyboardShortcuts();
        
        // Initialize analytics
        this.initAnalytics();
        
        // Wait for Firebase to be available
        this.waitForFirebase();
        
        // Check for dark mode schedule
        this.checkDarkModeSchedule();
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
    
    // Keyboard Shortcuts
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
    
    // Analytics
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
    }
    
    trackEvent(eventName, data = {}) {
        if (!this.settings.enableAnalytics) return;
        
        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            user: this.currentUser?.email || 'anonymous'
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
    }
    
    // Search functionality
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
    
    async performSearch(query) {
        if (!query || query.length < 2) {
            document.getElementById('searchResults').innerHTML = '';
            return;
        }
        
        // Show search status
        document.getElementById('searchStatus').style.display = 'flex';
        
        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const results = [];
        
        // Search meetings
        this.meetings.forEach(meeting => {
            if (meeting.title.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    type: 'meeting',
                    icon: 'fa-users',
                    title: meeting.title,
                    meta: `Spotkanie - ${new Date(meeting.dateTime).toLocaleDateString(this.settings.region)}`,
                    data: meeting
                });
            }
        });
        
        // Search favorite channels
        Object.entries(this.favoriteChannels).forEach(([id, channel]) => {
            if (channel.name.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    type: 'channel',
                    icon: 'fa-tv',
                    title: channel.name,
                    meta: 'Ulubiony kanał YouTube',
                    data: { id, ...channel }
                });
            }
        });
        
        // Search watch history
        this.watchHistory.forEach(video => {
            if (video.title.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    type: 'video',
                    icon: 'fa-play-circle',
                    title: video.title,
                    meta: `Obejrzane - ${new Date(video.watchedAt).toLocaleDateString(this.settings.region)}`,
                    data: video
                });
            }
        });
        
        // Search tags
        Object.entries(this.tags).forEach(([name, tag]) => {
            if (name.toLowerCase().includes(query.toLowerCase())) {
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
        this.trackEvent('search_performed', { query, resultsCount: results.length });
    }
    
    displaySearchResults(results, query) {
        const container = document.getElementById('searchResults');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Brak wyników dla "${this.escapeHtml(query)}"</p>
                    <p class="text-muted">Spróbuj innych słów kluczowych</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="search-results-header">
                <span>Znaleziono ${results.length} wyników dla "${this.escapeHtml(query)}"</span>
                <span class="text-muted">Wyszukiwanie TimerHub</span>
            </div>
            ${results.map(result => `
                <div class="search-result-item" onclick="window.app.handleSearchResultClick('${result.type}', ${JSON.stringify(result.data).replace(/"/g, '&quot;')})">
                    <div class="search-result-icon">
                        <i class="fas ${result.icon}"></i>
                    </div>
                    <div class="search-result-content">
                        <div class="search-result-title">${this.highlightSearchTerm(result.title, query)}</div>
                        <div class="search-result-meta">${result.meta}</div>
                    </div>
                </div>
            `).join('')}
        `;
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
    
    // AI Assistant
    openAIAssistant() {
        document.getElementById('aiAssistant').classList.add('active');
        document.getElementById('aiInput').focus();
        
        if (this.aiMessages.length === 0) {
            this.addAIMessage('Cześć! Jestem asystentem TimerHub. Mogę pomóc Ci w:', 'assistant');
            setTimeout(() => {
                this.addAIMessage('• Zarządzaniu spotkaniami i timerami\n• Wyszukiwaniu filmów na YouTube\n• Organizacji czasu pracy\n• Ustawieniach aplikacji\n\nJak mogę Ci pomóc?', 'assistant');
            }, 500);
        }
        
        this.trackEvent('ai_assistant_opened');
    }
    
    closeAIAssistant() {
        document.getElementById('aiAssistant').classList.remove('active');
    }
    
    async sendAIMessage() {
        const input = document.getElementById('aiInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        input.value = '';
        this.addAIMessage(message, 'user');
        
        // Show thinking indicator
        const thinkingId = this.addAIMessage('<div class="ai-thinking">Myślę</div>', 'assistant');
        
        // Process message
        const response = await this.processAIMessage(message);
        
        // Remove thinking indicator and add response
        this.removeAIMessage(thinkingId);
        this.addAIMessage(response, 'assistant');
        
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
        messageElement.innerHTML = content;
        
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
        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        const lowerMessage = message.toLowerCase();
        
        // Meeting related
        if (lowerMessage.includes('spotkanie') || lowerMessage.includes('meeting')) {
            if (lowerMessage.includes('dodaj') || lowerMessage.includes('nowe')) {
                return 'Aby dodać nowe spotkanie:\n1. Przejdź do sekcji Microsoft Teams\n2. Kliknij zakładkę "Nowe spotkanie"\n3. Wypełnij formularz i kliknij "Rozpocznij odliczanie"\n\nCzy chcesz, żebym otworzył tę sekcję?';
            } else if (lowerMessage.includes('najbliższe') || lowerMessage.includes('następne')) {
                const upcoming = this.getUpcomingMeetings();
                if (upcoming.length === 0) {
                    return 'Nie masz żadnych zaplanowanych spotkań.';
                }
                const next = upcoming[0];
                const date = new Date(next.dateTime);
                return `Twoje następne spotkanie:\n📅 ${next.title}\n🕐 ${date.toLocaleDateString(this.settings.region)} o ${date.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}`;
            }
        }
        
        // YouTube related
        if (lowerMessage.includes('youtube') || lowerMessage.includes('film')) {
            if (lowerMessage.includes('szukaj') || lowerMessage.includes('znajdź')) {
                return 'Mogę pomóc Ci znaleźć filmy na YouTube:\n1. Przejdź do sekcji YouTube\n2. Użyj zakładki "Wyszukaj"\n3. Wpisz szukaną frazę\n\nJakich filmów szukasz?';
            }
        }
        
        // Timer related
        if (lowerMessage.includes('timer') || lowerMessage.includes('czas')) {
            if (this.currentTimer) {
                return 'Masz aktywny timer. Czy chcesz go zatrzymać lub sprawdzić status?';
            } else {
                return 'Nie masz aktywnego timera. Możesz ustawić timer dla:\n• Spotkania Teams\n• Filmu YouTube\n• Sesji Pomodoro\n\nCo chcesz zaplanować?';
            }
        }
        
        // Pomodoro
        if (lowerMessage.includes('pomodoro')) {
            return 'Technika Pomodoro to metoda zarządzania czasem:\n• 25 minut pracy\n• 5 minut przerwy\n• Po 4 sesjach dłuższa przerwa\n\nChcesz rozpocząć sesję Pomodoro?';
        }
        
        // Settings
        if (lowerMessage.includes('ustawienia') || lowerMessage.includes('zmień')) {
            return 'Możesz zmienić wiele ustawień:\n• Motyw kolorystyczny\n• Rozmiar czcionki\n• Powiadomienia\n• Region i język\n\nOtwórz ustawienia klikając ikonę ⚙️ w prawym górnym rogu.';
        }
        
        // Help
        if (lowerMessage.includes('pomoc') || lowerMessage.includes('help')) {
            return 'Oto główne funkcje TimerHub:\n\n🎯 **Spotkania Teams**\n• Planuj i zarządzaj spotkaniami\n• Automatyczne przypomnienia\n• Historia spotkań\n\n📺 **YouTube**\n• Wyszukuj filmy i kanały\n• Zapisuj ulubione\n• Planuj oglądanie\n\n⏱️ **Timery**\n• Odliczanie do wydarzeń\n• Tryb Pomodoro\n• Automatyczne przerwy\n\n💬 **Czat**\n• Rozmawiaj z innymi użytkownikami\n• Prywatne wiadomości\n\nCzego dokładnie potrzebujesz?';
        }
        
        // Default response
        return 'Nie jestem pewien, jak mogę pomóc w tym przypadku. Spróbuj zapytać o:\n• Dodawanie spotkań\n• Wyszukiwanie filmów\n• Ustawienia aplikacji\n• Technikę Pomodoro\n• Ogólną pomoc';
    }
    
    // Notes functionality
    openNotesForTimer() {
        if (!this.currentTimer) return;
        
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
    }
    
    exportNotes() {
        if (!this.currentTimer) return;
        
        const noteKey = `timer_${this.currentTimer.type}_${this.currentTimer.startTime.getTime()}`;
        const notes = this.notes[noteKey] || { before: '', during: '', after: '' };
        
        const content = `# Notatki - ${this.currentTimer.title}
Data: ${new Date().toLocaleDateString(this.settings.region)}

## Przed spotkaniem
${notes.before || 'Brak notatek'}

## Podczas spotkania
${notes.during || 'Brak notatek'}

## Po spotkaniu
${notes.after || 'Brak notatek'}
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
        
        // Clear inputs
        document.getElementById('newTagInput').value = '';
        document.getElementById('newTagColor').value = '#6366f1';
        
        this.showNotification('Tag dodany!', 'success');
    }
    
    displayTags() {
        const container = document.getElementById('tagsList');
        const tags = Object.entries(this.tags);
        
        if (tags.length === 0) {
            container.innerHTML = '<p class="empty-state">Brak tagów</p>';
            return;
        }
        
        container.innerHTML = tags.map(([name, tag]) => `
            <span class="tag-item" style="background: ${tag.color}; color: ${this.getContrastColor(tag.color)}">
                ${this.escapeHtml(name)}
                <button class="tag-delete" onclick="window.app.deleteTag('${name}')">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
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
            createdAt: new Date().toISOString()
        };
        
        this.saveToStorage('playlists', this.playlists);
        this.displayPlaylists();
        this.showNotification('Playlista utworzona!', 'success');
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
                </div>
            </div>
        `).join('');
    }
    
    openPlaylist(playlistId) {
        const playlist = this.playlists[playlistId];
        if (!playlist) return;
        
        // TODO: Implement playlist view
        this.showNotification('Otwieranie playlisty...', 'info');
    }
    
    deletePlaylist(playlistId) {
        const playlist = this.playlists[playlistId];
        if (confirm(`Czy na pewno chcesz usunąć playlistę "${playlist.name}"?`)) {
            delete this.playlists[playlistId];
            this.saveToStorage('playlists', this.playlists);
            this.displayPlaylists();
            this.showNotification('Playlista usunięta', 'success');
        }
    }
    
    // Pomodoro functionality
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
        
        this.showNotification('Pomodoro rozpoczęte!', 'success');
        this.trackEvent('pomodoro_started');
    }
    
    updatePomodoroDisplay() {
        const minutes = Math.floor(this.pomodoroTimer.remaining / 60);
        const seconds = this.pomodoroTimer.remaining % 60;
        
        document.getElementById('pomodoroMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('pomodoroSeconds').textContent = String(seconds).padStart(2, '0');
    }
    
    completePomodoroSession() {
        clearInterval(this.pomodoroInterval);
        
        if (this.isWorkSession) {
            this.pomodoroSessions++;
            document.getElementById('pomodoroSessions').textContent = this.pomodoroSessions;
            
            // Play notification sound
            this.playNotificationSound();
            
            // Show notification
            this.showNotification('Czas na przerwę!', 'success');
            
            // Start break
            this.isWorkSession = false;
            document.getElementById('pomodoroStatus').textContent = 'Przerwa';
            
            this.pomodoroTimer = {
                duration: this.settings.pomodoroBreak * 60,
                remaining: this.settings.pomodoroBreak * 60,
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
            this.showNotification('Przerwa zakończona! Czas wrócić do pracy.', 'info');
            
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
    
    // Recent activity
    addToRecentActivity(type, title, icon = 'fa-clock') {
        const activity = {
            type,
            title,
            icon,
            timestamp: new Date().toISOString()
        };
        
        this.recentActivity.unshift(activity);
        if (this.recentActivity.length > 10) {
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
        
        container.innerHTML = this.recentActivity.map(activity => {
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
    
    // Filters
    filterMeetings() {
        const searchQuery = document.getElementById('meetingsSearch').value.toLowerCase();
        const filterType = document.getElementById('meetingsFilter').value;
        
        let filtered = this.meetings;
        
        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(meeting => 
                meeting.title.toLowerCase().includes(searchQuery) ||
                meeting.link.toLowerCase().includes(searchQuery)
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
                        ${tags.length > 0 ? `
                            <div class="meeting-tags">
                                ${tags.map(tag => `
                                    <span class="tag-item" style="background: ${this.tags[tag]?.color || '#6366f1'}; color: ${this.getContrastColor(this.tags[tag]?.color || '#6366f1')}">
                                        ${this.escapeHtml(tag)}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <div class="history-actions">
                        <button onclick="window.app.startMeetingTimer(${meeting.id})">
                            <i class="fas fa-play"></i> Start
                        </button>
                        <button onclick="window.app.openNotesForMeeting(${meeting.id})">
                            <i class="fas fa-sticky-note"></i>
                        </button>
                        <button onclick="window.app.deleteMeeting(${meeting.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
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
        const users = [];
        
        // Filter online users
        Object.entries(this.onlineUsers).forEach(([userId, presence]) => {
            if (userId !== this.firebaseUser?.uid && presence.user_info) {
                const name = presence.user_info.name || 'Użytkownik';
                if (name.toLowerCase().includes(query)) {
                    users.push({
                        userId,
                        name,
                        picture: presence.user_info.picture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
                        isOnline: true
                    });
                }
            }
        });
        
        // Filter offline users
        Object.entries(this.allUsers).forEach(([userId, userInfo]) => {
            if (userId !== this.firebaseUser?.uid && !users.find(u => u.userId === userId)) {
                const name = userInfo.name || 'Użytkownik';
                if (name.toLowerCase().includes(query)) {
                    users.push({
                        userId,
                        name,
                        picture: userInfo.picture || 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
                        isOnline: false
                    });
                }
            }
        });
        
        if (users.length === 0) {
            container.innerHTML = '<p class="empty-state">Nie znaleziono użytkowników</p>';
            return;
        }
        
        container.innerHTML = users.map(user => {
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
    
    // Chat enhancements
    handleChatTyping() {
        if (!this.firebaseUser) return;
        
        // Clear previous timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Send typing status
        this.sendTypingStatus(true);
        
        // Clear typing after 3 seconds
        this.typingTimeout = setTimeout(() => {
            this.sendTypingStatus(false);
        }, 3000);
    }
    
    async sendTypingStatus(isTyping) {
        if (!this.firebaseUser || !this.isFirebaseReady) return;
        
        try {
            const typingRef = window.firebase.ref(window.firebase.database, `chat/typing/${this.firebaseUser.uid}`);
            
            if (isTyping) {
                await window.firebase.set(typingRef, {
                    userName: this.currentUser.name,
                    timestamp: Date.now()
                });
            } else {
                await window.firebase.remove(typingRef);
            }
        } catch (error) {
            console.error('Error sending typing status:', error);
        }
    }
    
    listenToTypingStatus() {
        if (!this.isFirebaseReady) return;
        
        const typingRef = window.firebase.ref(window.firebase.database, 'chat/typing');
        
        window.firebase.onValue(typingRef, (snapshot) => {
            const typingUsers = [];
            const now = Date.now();
            
            snapshot.forEach((childSnapshot) => {
                const userId = childSnapshot.key;
                const data = childSnapshot.val();
                
                // Show typing only for others and if recent (< 5 seconds)
                if (userId !== this.firebaseUser?.uid && (now - data.timestamp) < 5000) {
                    typingUsers.push(data.userName);
                }
            });
            
            this.updateTypingIndicator(typingUsers);
        });
    }
    
    updateTypingIndicator(typingUsers) {
        const container = document.getElementById('chatTyping');
        const text = document.getElementById('typingUsers');
        
        if (typingUsers.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'flex';
        
        if (typingUsers.length === 1) {
            text.textContent = `${typingUsers[0]} pisze...`;
        } else if (typingUsers.length === 2) {
            text.textContent = `${typingUsers[0]} i ${typingUsers[1]} piszą...`;
        } else {
            text.textContent = `${typingUsers[0]} i ${typingUsers.length - 1} innych piszą...`;
        }
    }
    
    toggleEmojiPicker() {
        const picker = document.getElementById('emojiPicker');
        picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
    }
    
    insertEmoji(emoji) {
        const input = document.getElementById('chatInput');
        input.value += emoji;
        input.focus();
        this.toggleEmojiPicker();
    }
    
    replyToMessage() {
        // TODO: Implement reply functionality
        this.showNotification('Funkcja odpowiedzi będzie dostępna wkrótce', 'info');
        document.getElementById('messageContextMenu').style.display = 'none';
    }
    
    editMessage() {
        // TODO: Implement edit functionality
        this.showNotification('Funkcja edycji będzie dostępna wkrótce', 'info');
        document.getElementById('messageContextMenu').style.display = 'none';
    }
    
    // Settings enhancements
    changeNotificationSound(sound) {
        this.settings.notificationSound = sound;
        this.saveSettings();
        
        // Test sound
        if (sound !== 'none') {
            this.playNotificationSound();
        }
    }
    
    playNotificationSound() {
        if (this.settings.notificationSound === 'none') return;
        
        const soundData = this.notificationSounds[this.settings.notificationSound];
        if (soundData) {
            const audio = new Audio(soundData);
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Could not play notification sound:', e));
        }
    }
    
    togglePomodoro() {
        this.settings.enablePomodoro = document.getElementById('enablePomodoro').checked;
        this.saveSettings();
    }
    
    updatePomodoroSettings() {
        this.settings.pomodoroWork = parseInt(document.getElementById('pomodoroWork').value);
        this.settings.pomodoroBreak = parseInt(document.getElementById('pomodoroBreak').value);
        this.saveSettings();
    }
    
    toggleAutoBreak() {
        this.settings.enableAutoBreak = document.getElementById('enableAutoBreak').checked;
        this.saveSettings();
        
        if (this.settings.enableAutoBreak) {
            this.scheduleAutoBreak();
        } else {
            this.cancelAutoBreak();
        }
    }
    
    scheduleAutoBreak() {
        // Cancel existing timeout
        this.cancelAutoBreak();
        
        // Schedule break after 2 hours
        this.autoBreakTimeout = setTimeout(() => {
            this.showNotification('Czas na przerwę! Pracujesz już 2 godziny.', 'warning');
            this.startPomodoro(); // Start a break session
        }, 2 * 60 * 60 * 1000);
    }
    
    cancelAutoBreak() {
        if (this.autoBreakTimeout) {
            clearTimeout(this.autoBreakTimeout);
            this.autoBreakTimeout = null;
        }
    }
    
    toggleAnalytics() {
        this.settings.enableAnalytics = document.getElementById('enableAnalytics').checked;
        this.saveSettings();
        
        if (!this.settings.enableAnalytics) {
            // Clear existing analytics
            localStorage.removeItem('analytics');
            this.showNotification('Dane analityczne zostały wyłączone i usunięte', 'info');
        }
    }
    
    toggleKeyboardShortcuts() {
        this.settings.enableKeyboardShortcuts = document.getElementById('enableKeyboardShortcuts').checked;
        this.saveSettings();
    }
    
    toggleDebugMode() {
        this.debugMode = document.getElementById('enableDebugMode').checked;
        
        if (this.debugMode) {
            console.log('Debug mode enabled');
            console.log('Current state:', {
                user: this.currentUser,
                firebaseUser: this.firebaseUser,
                settings: this.settings,
                timers: this.currentTimer,
                meetings: this.meetings.length,
                watchHistory: this.watchHistory.length
            });
        }
    }
    
    toggleDarkModeSchedule() {
        this.settings.enableDarkModeSched = document.getElementById('enableDarkModeSched').checked;
        this.saveSettings();
        this.checkDarkModeSchedule();
    }
    
    checkDarkModeSchedule() {
        if (!this.settings.enableDarkModeSched) return;
        
        const now = new Date();
        const hour = now.getHours();
        
        // Dark mode between 19:00 and 7:00
        const shouldBeDark = hour >= 19 || hour < 7;
        const isDark = !document.body.classList.contains('light-theme');
        
        if (shouldBeDark && !isDark) {
            this.toggleTheme();
        } else if (!shouldBeDark && isDark) {
            this.toggleTheme();
        }
        
        // Check again in 5 minutes
        setTimeout(() => this.checkDarkModeSchedule(), 5 * 60 * 1000);
    }
    
    async syncWithCloud() {
        if (!this.firebaseUser || !this.isFirebaseReady) {
            this.showNotification('Musisz być zalogowany do synchronizacji', 'warning');
            return;
        }
        
        try {
            this.showNotification('Synchronizacja w toku...', 'info');
            
            await this.saveAllUserData();
            await this.syncUserData();
            
            this.showNotification('Synchronizacja zakończona!', 'success');
        } catch (error) {
            console.error('Sync error:', error);
            this.showNotification('Błąd synchronizacji', 'error');
        }
    }
    
    // Modal helper
    showModal(title, content, className = '') {
        const modal = document.createElement('div');
        modal.className = `modal active ${className}`;
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Close other overlays
        this.closeSearch();
        this.closeAIAssistant();
        
        if (document.getElementById('globalChat').classList.contains('active')) {
            this.toggleChat();
        }
        
        if (document.getElementById('settingsPanel').classList.contains('active')) {
            this.toggleSettings();
        }
    }
    
    // Calendar integration placeholder
    showCalendarIntegration() {
        this.showNotification('Integracja z kalendarzem będzie dostępna wkrótce!', 'info');
    }
    
    // Stats placeholder
    showStats() {
        const totalMeetings = this.meetings.length + this.meetingsHistory.length;
        const totalVideos = this.watchHistory.length;
        const totalChannels = Object.keys(this.favoriteChannels).length;
        const activeDays = this.calculateActiveDays();
        
        const content = `
            <div class="stats-overview">
                <div class="stat-item">
                    <i class="fas fa-users"></i>
                    <div>
                        <div class="stat-value">${totalMeetings}</div>
                        <div class="stat-label">Wszystkich spotkań</div>
                    </div>
                </div>
                <div class="stat-item">
                    <i class="fas fa-play-circle"></i>
                    <div>
                        <div class="stat-value">${totalVideos}</div>
                        <div class="stat-label">Obejrzanych filmów</div>
                    </div>
                </div>
                <div class="stat-item">
                    <i class="fas fa-tv"></i>
                    <div>
                        <div class="stat-value">${totalChannels}</div>
                        <div class="stat-label">Ulubionych kanałów</div>
                    </div>
                </div>
                <div class="stat-item">
                    <i class="fas fa-fire"></i>
                        <div class="stat-value">${activeDays}</div>
                        <div class="stat-label">Dni aktywności</div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 2rem; text-align: center;">
                <p class="text-muted">Szczegółowe statystyki będą dostępne wkrótce!</p>
            </div>
        `;
        
        this.showModal('📊 Statystyki', content);
    }
    
    calculateActiveDays() {
        const activityDates = new Set();
        
        // Add meeting dates
        this.meetings.forEach(m => {
            activityDates.add(new Date(m.dateTime).toDateString());
        });
        
        // Add watch history dates
        this.watchHistory.forEach(w => {
            activityDates.add(new Date(w.watchedAt).toDateString());
        });
        
        return activityDates.size;
    }
    
    // Update stats for main screen
    updateStats() {
        // Count today's meetings
        const today = new Date().toDateString();
        const todayMeetings = this.meetings.filter(m => 
            new Date(m.dateTime).toDateString() === today
        ).length;
        
        document.getElementById('totalMeetings').textContent = todayMeetings;
        document.getElementById('totalVideos').textContent = this.watchHistory.length;
        document.getElementById('favoriteChannels').textContent = Object.keys(this.favoriteChannels).length;
        
        // Calculate streak
        const streak = this.calculateStreak();
        document.getElementById('streakDays').textContent = streak;
    }
    
    calculateStreak() {
        const dates = [];
        
        // Collect all activity dates
        this.meetings.forEach(m => dates.push(new Date(m.dateTime).toDateString()));
        this.watchHistory.forEach(w => dates.push(new Date(w.watchedAt).toDateString()));
        
        // Sort unique dates
        const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
        
        if (uniqueDates.length === 0) return 0;
        
        let streak = 0;
        const today = new Date();
        let checkDate = new Date(today);
        
        // Check consecutive days
        for (let i = 0; i < uniqueDates.length; i++) {
            const activityDate = new Date(uniqueDates[i]);
            const daysDiff = Math.floor((checkDate - activityDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === 0 || daysDiff === 1) {
                streak++;
                checkDate = activityDate;
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    // Search improvements
    async searchYouTube() {
        const query = document.getElementById('youtubeSearch').value;
        const searchType = document.querySelector('.search-type.active').dataset.type;
        
        if (!query) {
            this.showNotification('Wpisz frazę do wyszukania', 'warning');
            return;
        }
        
        // Show search status
        document.getElementById('youtubeSearchStatus').style.display = 'flex';
        
        // Simulate search
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Hide search status
        document.getElementById('youtubeSearchStatus').style.display = 'none';
        
        // Add to search history
        this.addToSearchHistory(query);
        
        // Redirect to YouTube
        this.redirectToYouTube(query, searchType);
        
        // Clear search input
        document.getElementById('youtubeSearch').value = '';
        
        // Track search
        this.trackEvent('youtube_search', { query, type: searchType });
    }
    
    getUpcomingMeetings() {
        const now = new Date();
        return this.meetings
            .filter(m => new Date(m.dateTime) > now)
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    }
    
    openNotesForMeeting(meetingId) {
        const meeting = this.meetings.find(m => m.id === meetingId);
        if (!meeting) return;
        
        // Create temporary timer object for notes
        this.currentTimer = {
            type: 'teams',
            title: meeting.title,
            startTime: new Date(meeting.dateTime)
        };
        
        this.openNotesForTimer();
    }
    
    // Load settings with new features
    loadSettings() {
        const savedSettings = localStorage.getItem('timerHubSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            this.applySettings();
        }
        
        // Load other data
        this.tags = this.loadFromStorage('tags') || {};
        this.playlists = this.loadFromStorage('playlists') || {};
        this.notes = this.loadFromStorage('notes') || {};
        this.recentActivity = this.loadFromStorage('recentActivity') || [];
        this.searchHistory = this.loadFromStorage('searchHistory') || [];
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
        document.getElementById('notificationSound').value = this.settings.notificationSound;
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
        document.getElementById('enablePomodoro').checked = this.settings.enablePomodoro;
        document.getElementById('pomodoroWork').value = this.settings.pomodoroWork;
        document.getElementById('pomodoroBreak').value = this.settings.pomodoroBreak;
        document.getElementById('enableAutoBreak').checked = this.settings.enableAutoBreak;
        document.getElementById('enableAnalytics').checked = this.settings.enableAnalytics;
        document.getElementById('enableKeyboardShortcuts').checked = this.settings.enableKeyboardShortcuts;
        document.getElementById('enableDarkModeSched').checked = this.settings.enableDarkModeSched;
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
            tags: this.tags,
            playlists: this.playlists,
            notes: this.notes,
            recentActivity: this.recentActivity,
            exportDate: new Date().toISOString(),
            version: '2.0'
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
        this.trackEvent('data_exported');
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
                    this.tags = data.tags || {};
                    this.playlists = data.playlists || {};
                    this.notes = data.notes || {};
                    this.recentActivity = data.recentActivity || [];
                    
                    // Save all data
                    await this.saveAllUserData();
                    this.saveSettings();
                    this.saveToStorage('tags', this.tags);
                    this.saveToStorage('playlists', this.playlists);
                    this.saveToStorage('notes', this.notes);
                    this.saveToStorage('recentActivity', this.recentActivity);
                    
                    // Refresh UI
                    this.applySettings();
                    this.updateStats();
                    this.loadFavoriteChannels();
                    this.loadWatchHistory();
                    this.loadUpcomingMeetings();
                    this.loadMeetingsHistory();
                    this.loadFavoriteMeetings();
                    this.displayTags();
                    this.displayPlaylists();
                    this.displayRecentActivity();
                    
                    this.showNotification('Dane zaimportowane pomyślnie', 'success');
                    this.trackEvent('data_imported');
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
                this.tags = {};
                this.playlists = {};
                this.notes = {};
                this.recentActivity = [];
                this.searchHistory = [];
                
                // Clear from storage
                if (this.currentUser) {
                    const userKey = this.currentUser.sub;
                    localStorage.removeItem(`watchHistory_${userKey}`);
                    localStorage.removeItem(`favoriteChannels_${userKey}`);
                    localStorage.removeItem(`meetings_${userKey}`);
                    localStorage.removeItem(`meetingsHistory_${userKey}`);
                    localStorage.removeItem(`favoriteMeetings_${userKey}`);
                    localStorage.removeItem('tags');
                    localStorage.removeItem('playlists');
                    localStorage.removeItem('notes');
                    localStorage.removeItem('recentActivity');
                    localStorage.removeItem('searchHistory');
                    localStorage.removeItem('analytics');
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
                    compactMode: false,
                    notificationSound: 'default',
                    enablePomodoro: false,
                    pomodoroWork: 25,
                    pomodoroBreak: 5,
                    enableAutoBreak: false,
                    enableAnalytics: true,
                    enableKeyboardShortcuts: true,
                    enableDarkModeSched: false
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
                this.displayTags();
                this.displayPlaylists();
                this.displayRecentActivity();
                
                this.showNotification('Wszystkie dane zostały usunięte', 'success');
                this.trackEvent('all_data_cleared');
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
                this.listenToTypingStatus();
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
            this.listenToTypingStatus();
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
        // Initialize search functionality
        document.getElementById('universalSearch').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
        
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
        
        // Load initial data
        this.displayTags();
        this.displayPlaylists();
        this.displayRecentActivity();
        
        // Start auto-break timer if enabled
        if (this.settings.enableAutoBreak) {
            this.scheduleAutoBreak();
        }
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
            
            // Track login
            this.trackEvent('user_login', { method: 'google' });
        } catch (error) {
            console.error('Login error:', error);
            alert('Błąd logowania. Spróbuj ponownie.');
        }
    }
    
    // Continue with rest of the original methods...
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
                await window.firebase.update(messageRef, { read: true });
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
                        
                        // Play sound
                        this.playNotificationSound();
                        
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
        
        // Display recent activity
        this.displayRecentActivity();
        
        // Update upcoming meetings badge
        this.updateUpcomingBadge();
        
        // Ensure Firebase connection after app loads
        if (this.isFirebaseReady && !this.firebaseUser) {
            setTimeout(async () => {
                console.log('App loaded, creating Firebase user...');
                await this.createAnonymousUser();
            }, 1000);
        }
    }
    
    updateUpcomingBadge() {
        const upcoming = this.getUpcomingMeetings();
        const todayMeetings = upcoming.filter(m => {
            const meetingDate = new Date(m.dateTime);
            const today = new Date();
            return meetingDate.toDateString() === today.toDateString();
        });
        
        const badge = document.getElementById('upcomingBadge');
        if (todayMeetings.length > 0) {
            badge.textContent = todayMeetings.length;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
    
    logout() {
        if (confirm('Czy na pewno chcesz się wylogować?')) {
            // Stop timers
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
            
            if (this.pomodoroInterval) {
                clearInterval(this.pomodoroInterval);
            }
            
            // Cancel auto break
            this.cancelAutoBreak();
            
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
            
            // Track logout
            this.trackEvent('user_logout');
            
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
        this.displayTags();
    }
    
    showYouTubeMode() {
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('teamsMode').style.display = 'none';
        document.getElementById('youtubeMode').style.display = 'block';
        this.loadFavoriteChannels();
        this.loadWatchHistory();
        this.displayPlaylists();
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
        const tags = document.getElementById('meetingTags').value;
        const autoOpen = document.getElementById('autoOpenTeams').checked;
        const addToFavorites = document.getElementById('addToFavorites').checked;
        
        // Get selected reminders
        const reminderCheckboxes = document.querySelectorAll('input[name="reminders"]:checked');
        const reminders = Array.from(reminderCheckboxes).map(cb => parseInt(cb.value));
        
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
            tags,
            reminders,
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
        
        // Add to recent activity
        this.addToRecentActivity('meeting', `Dodano spotkanie: ${title}`, 'fa-users');
        
        // Schedule reminders
        this.scheduleReminders(meeting);
        
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
        
        // Update upcoming badge
        this.updateUpcomingBadge();
        
        // Go back to main menu
        setTimeout(() => this.showMainMenu(), 1000);
        
        // Track event
        this.trackEvent('meeting_created', { duration, hasReminders: reminders.length > 0, hasTags: !!tags });
    }
    
    scheduleReminders(meeting) {
        const meetingTime = new Date(meeting.dateTime).getTime();
        const now = Date.now();
        
        meeting.reminders.forEach(minutesBefore => {
            const reminderTime = meetingTime - (minutesBefore * 60 * 1000);
            const timeUntilReminder = reminderTime - now;
            
            if (timeUntilReminder > 0) {
                setTimeout(() => {
                    this.showMeetingReminder(meeting, minutesBefore);
                }, timeUntilReminder);
            }
        });
    }
    
    showMeetingReminder(meeting, minutesBefore) {
        const title = `Przypomnienie: ${meeting.title}`;
        const body = `Spotkanie za ${minutesBefore} minut`;
        
        // Show notification
        this.showNotification(body, 'warning');
        
        // Play sound
        this.playNotificationSound();
        
        // Push notification
        if (this.settings.pushNotifications) {
            this.sendPushNotification(title, body);
        }
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
        
        // Add to recent activity
        this.addToRecentActivity('meeting', `Szybki start: ${title}`, 'fa-play');
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
        this.updateUpcomingBadge();
        this.showNotification('Spotkanie dodane!', 'success');
        
        // Add to recent activity
        this.addToRecentActivity('meeting', `Dodano spotkanie: ${title}`, 'fa-plus-circle');
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
            const tags = meeting.tags ? meeting.tags.split(',').map(tag => tag.trim()) : [];
            
            return `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${this.escapeHtml(meeting.title)}</h4>
                        <div class="history-meta">
                            <span><i class="fas fa-calendar"></i> ${meetingDate.toLocaleDateString(this.settings.region)}</span>
                            <span><i class="fas fa-clock"></i> ${meetingDate.toLocaleTimeString(this.settings.region, {hour: '2-digit', minute: '2-digit'})}</span>
                            <span><i class="fas fa-hourglass"></i> ${meeting.duration} min</span>
                        </div>
                        ${tags.length > 0 ? `
                            <div class="meeting-tags">
                                ${tags.map(tag => `
                                    <span class="tag-item" style="background: ${this.tags[tag]?.color || '#6366f1'}; color: ${this.getContrastColor(this.tags[tag]?.color || '#6366f1')}">
                                        ${this.escapeHtml(tag)}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
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
                        ${tags.length > 0 ? `
                            <div class="meeting-tags">
                                ${tags.map(tag => `
                                    <span class="tag-item" style="background: ${this.tags[tag]?.color || '#6366f1'}; color: ${this.getContrastColor(this.tags[tag]?.color || '#6366f1')}">
                                        ${this.escapeHtml(tag)}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <div class="history-actions">
                        <button onclick="window.app.startMeetingTimer(${meeting.id})">
                            <i class="fas fa-play"></i> Start
                        </button>
                        <button onclick="window.app.openNotesForMeeting(${meeting.id})">
                            <i class="fas fa-sticky-note"></i>
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
            
            // Add to recent activity
            this.addToRecentActivity('timer', `Uruchomiono timer: ${meeting.title}`, 'fa-play-circle');
        }
    }
    
    async deleteMeeting(id) {
        this.meetings = this.meetings.filter(m => m.id !== id);
        await this.saveUserData('meetings', this.meetings);
        this.loadUpcomingMeetings();
        this.updateStats();
        this.updateUpcomingBadge();
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
        
        // Add to recent activity
        this.addToRecentActivity('video', `Zaplanowano: ${title}`, 'fa-youtube');
        
        // Reset form and go back to main menu
        e.target.reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('videoDate').value = today;
        
        // Show active timer notification
        document.getElementById('activeTimerNotification').style.display = 'block';
        document.getElementById('activeTimerText').textContent = `Odliczanie: ${title}`;
        
        // Go back to main menu
        setTimeout(() => this.showMainMenu(), 1000);
        
        // Track event
        this.trackEvent('youtube_timer_set', { duration });
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
        
        // Add to recent activity
        this.addToRecentActivity('search', `Wyszukano: ${query} (${type})`, 'fa-search');
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
        
        // Add to recent activity
        this.addToRecentActivity('channel', `Dodano do ulubionych: ${name}`, 'fa-star');
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
        
        // Add to recent activity
        this.addToRecentActivity('channel', `Otworzono kanał: ${channelName}`, 'fa-tv');
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
        
        // Add to recent activity
        this.addToRecentActivity('video', `Obejrzano: ${title}`, 'fa-play-circle');
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
        } else if (type === 'youtube') {
            iconElement.innerHTML = '<i class="fab fa-youtube" style="color: #ff0000;"></i>';
        } else {
            iconElement.innerHTML = '<i class="fas fa-clock"></i>';
        }
        
        // Set title
        document.getElementById('timerTitle').textContent = this.currentTimer.title;
        
        // Start timer interval
        this.timerInterval = setInterval(() => this.updateTimer(), 100);
        
        // Save current timer state
        this.saveToStorage('activeTimer', this.currentTimer);
        
        // Track event
        this.trackEvent('timer_started', { type, duration });
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
                    this.playNotificationSound();
                    
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
                    this.playNotificationSound();
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
                this.playNotificationSound();
            }
            
            // Update stats
            if (this.currentTimer.type === 'teams') {
                const todayMeetings = parseInt(document.getElementById('totalMeetings').textContent);
                document.getElementById('totalMeetings').textContent = todayMeetings + 1;
            } else if (this.currentTimer.type === 'youtube') {
                const totalVideos = parseInt(document.getElementById('totalVideos').textContent);
                document.getElementById('totalVideos').textContent = totalVideos + 1;
            }
            
            // Clear saved timer
            localStorage.removeItem('activeTimer');
            
            // Hide active timer notification
            document.getElementById('activeTimerNotification').style.display = 'none';
            
            // Auto close after 5 seconds
            setTimeout(() => this.closeTimer(), 5000);
            
            // Track completion
            this.trackEvent('timer_completed', { type: this.currentTimer.type, duration: this.currentTimer.duration });
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
            
            // Add to recent activity
            this.addToRecentActivity(
                this.currentTimer.type === 'teams' ? 'meeting' : 'video',
                `Otworzono: ${this.currentTimer.title}`,
                this.currentTimer.type === 'teams' ? 'fa-users' : 'fa-youtube'
            );
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
            
            this.trackEvent('timer_stopped');
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
