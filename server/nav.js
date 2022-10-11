const navBalk = {
    navigatieBalk: `
    <nav class="menu-container">
        <!-- burger menu -->
        <input type="checkbox" aria-label="Toggle menu" />
        <span></span>
        <span></span>
        <span></span>

        <!-- logo -->
        <a href="/" class="menu-logo">
            <img src="/media/logoNib.jpg"/>
        </a>

        <!-- menu items -->
        <div class="menu">
            <ul>
                <li>
                    <a href="/dashboard">
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="/contact">
                        Contact
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="/dashboard" class="dashboardLink">
                        Login
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    `
}

module.exports = navBalk;