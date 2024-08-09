import "./index.css"
const Header=()=>{
    return(
        <div className="header-section">
        <header className="header">
            <img
              className="profile-img-logo"
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSHiKtyhFjc7Wtri86aOB_pMsz49PFPTTnedFrt6NrBMKjwFHc1"
              alt="Profile"
            />   
            <h1 className="title">PopAi</h1>
            <span className="subtitle">| Your Personal AI Workspace</span>
      </header>
      <p className="subtitle-msg">CHAT WITH DOCUMENT</p>
      </div>
    )
}
export default Header