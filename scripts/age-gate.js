(function () {
    if (localStorage.getItem('ageVerified') === 'true') return;

    const style = document.createElement('style');
    style.textContent = `
        #age-gate-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(17, 17, 17, 0.95);
            backdrop-filter: blur(8px);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Play', 'Orbitron', sans-serif;
            color: #f0fdf4;
        }
        .age-gate-modal {
            background:rgb(5, 5, 5);
            border: 2px solid rgba(34, 197, 94, 0.5);
            border-radius: 20px;
            padding: 30px 40px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }
        .age-gate-modal h2 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            background: linear-gradient(to right, #22c55e, #84cc16);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .age-gate-modal p {
            font-size: 0.95rem;
            color: #86efac;
            margin-bottom: 25px;
            line-height: 1.5;
        }
        .age-gate-modal a {
            color: #22c55e;
            text-decoration: underline;
        }
        .age-gate-btn {
            background: linear-gradient(135deg, #22c55e, #84cc16);
            color: #000;
            border: none;
            outline: none;
            padding: 14px 24px;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            transition: filter 0.2s ease, transform 0.1s ease;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }
        .age-gate-btn:hover {
            filter: brightness(1.15);
        }
        .age-gate-btn:active {
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'age-gate-overlay';
    overlay.innerHTML = `
        <div class="age-gate-modal">
            <h2>Age Verification</h2>
            <p>This is a fictional simulation for entertainment purposes only. consumption is required or encouraged.</p>
            <p>You must be <strong>over 18 years old</strong> to enter this site. By entering, you agree to our <a href="credits.txt" target="_blank">Terms of Service</a>.</p>
            <button class="age-gate-btn" id="ageConfirmBtn">I am Over 18 & Agree</button>
        </div>
    `;
    document.body.appendChild(overlay);

    document.body.style.overflow = 'hidden';

    document.getElementById('ageConfirmBtn').addEventListener('click', () => {
        localStorage.setItem('ageVerified', 'true');
        document.body.style.overflow = '';
        overlay.remove();
        style.remove();
    });
})();