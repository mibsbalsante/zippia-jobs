import { JobsProvider } from "@ctx/Jobs"

import Header from "@cmp/Header"
import Filter from "@cmp/Filter"
import List from "@cmp/List"

import "./App.css"

function App() {
  return (
    <div className="App">
      <JobsProvider>
        <Header />
        <Filter />
        <List />
      </JobsProvider>
    </div>
  )
}

export default App
