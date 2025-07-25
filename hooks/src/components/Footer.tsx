
export const Footer = () => {  
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-left">
                <p>
                    Built by <a href="https://github.com/Amrillo/REACT2025Q3" target="_blank" rel="noopener noreferrer">Amrillo</a>
                </p>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
                <div className="footer-right">
                <a
                    href="https://rs.school/courses/reactjs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    📘 View React Course
                </a>
                </div>
            </div>
        </footer>
       
    )
}