
const inputField = document.getElementById("title")
const searchBtn = document.getElementById("search-btn")
const list = document.getElementById("list")
const displayPlot = document.querySelector(".display-plot")
const closeBtn = document.getElementById("close-btn")
let para
let key
let books = []
let matches = []


inputField.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase()
  console.log(searchInput)
   matches = books.filter(book => {
  return (
    book.authors[0].name.toLowerCase().includes(searchInput)
  || book.title.toLowerCase().includes(searchInput)
)
  })
  console.log(matches)
})

searchBtn.addEventListener("click", displayTitles)

function displayTitles() {
  list.innerHTML = " "
  if (matches.length > 0){
  matches.forEach(match => {
  const li = document.createElement("li")
  li.style.cssText = "list-style: none; margin-left: 10px;"
  const link = document.createElement("a")
  link.style.cssText = "color: #000; margin: 10px;"
  link.id = "plot"
  link.href ="javascript: test()"
  list.append(li)
  li.append(link)
  link.textContent =`${match.authors[0].name} : ${match.title}`
   key = match.key
   })
 } else {
   list.textContent = "No matches found"
 }
  inputField.value = " "
  }


const getData = async () => {
  try {
    const url = "https://openlibrary.org/subjects/fantasy.json"
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.works)
    return data

  } catch(err) {
    console.error(err)
    alert(err)
  }
}

getData().then(data => {
    books = data.works
       })


function test() {
    const getPlot = async () => {
      try {
        const url = `https://openlibrary.org${key}.json`
        const res = await fetch(url)
        const data = await res.json()
        console.log(data.desciption)
        console.log(data)
        return  data

      } catch(err) {
          console.log(err)
        alert(err)
      }
    }

   getPlot().then(data => {
       para = document.createElement("p")
       displayPlot.style.display = "block"
       displayPlot.appendChild(para)
       para.classList.add("plot")
       para.textContent = data.description
       closeModal()
       })

}

function closeModal() {
  closeBtn.addEventListener("click", () => {
     displayPlot.style.display = "none"
     reset()
        })
      }

      const reset = () => {
        para.innerHTML = " "
        }
