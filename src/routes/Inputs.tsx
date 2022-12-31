import { useEffect } from "react";

const Inputs = () => {
    function cookieGenerator(name: string, value: string): string {
        return `${name}=${value}`;
    }

    const handleButtonClick = () => {
        if (document.cookie.split(';').some(item => item.trim().startsWith('Las Vegas'))) {
            alert('Cookie exists');
        } else {
            document.cookie = cookieGenerator('Las Vegas', 'Raiders');
            document.cookie = cookieGenerator('Kansas City', 'Chiefs');
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => alert(`Key Pressed: ${e.key}`);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    return (
        <div>
            <section>
                <h1>Cypress Cookies</h1>
                <button id="clicked" onClick={handleButtonClick}>Click to generate cookies</button>
            </section>
            <h2>Various Inputs</h2>
            <section>
                <div className="container">
                    <label htmlFor="normal-text">Normal Text Input</label>
                    <input type="text" name="normal-text" id="normal-text" />
                </div>
                <div className="container">
                    <label htmlFor="key-combo">Key Combination Input</label>
                    <input type="text" name="key-combo" id="key-combo" />
                </div>
                <div className="container">
                    <label htmlFor="date">Date Input</label>
                    <input type="date" name="date" id="date" />
                </div>
                <div className="container">
                    <label htmlFor="month">Month Input</label>
                    <input type="month" name="month" id="month" />
                </div>
                <div className="container">
                    <label htmlFor="week">Week Input</label>
                    <input type="text" name="week" id="week" />
                </div>
                <div className="container">
                    <label htmlFor="time">Time Input</label>
                    <input type="text" name="time" id="time"/>
                </div>
                <div className="container">
                    <label htmlFor="textarea">Textarea Input</label>
                    <textarea name="textarea" id="textarea" cols={30} rows={10} />
                </div>
                <div className="container">
                    <div contentEditable={true} style={{ width: '250px' }} suppressContentEditableWarning={true}>Something something dark side</div>
                </div>
            </section>
            <a href="/form">Click here to go to the form page.</a>
        </div>
    )
};

export default Inputs;