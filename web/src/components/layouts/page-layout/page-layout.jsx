import './page-layout.css';
function PageLayout({ children }) {
    return (
      <div className="container py-4">{children}</div>
    )
  }
  
  export default PageLayout;