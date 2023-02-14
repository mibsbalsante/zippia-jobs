import { JobsProvider } from "@ctx/Jobs"

import List from "@cmp/List"

import "./App.css"

function App() {
  return (
    <div className="App">
      <JobsProvider>
        <List />
      </JobsProvider>
    </div>
  )
}

export default App
