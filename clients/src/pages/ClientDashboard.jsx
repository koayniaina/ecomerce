import Content from "../components/Content"
import Navbar from "../components/Navbar"

function Dashboard() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="content">
        <Content />
      </div>
    </div>
  )
}

export default Dashboard