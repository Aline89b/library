import "./style.css"
import  get from 'lodash.get';



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

inputField.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    e.preventDefault()
    searchBtn.click()
  }
})


searchBtn.addEventListener("click", displayTitles)



const getData = async () => {
  try {
    const url = "https://openlibrary.org/subjects/fantasy.json"
    const res = await fetch(url)
    let data = await res.json()

    function get( data, keys, defaultVal ){
      defaultVal = alert("not available")
      keys = Array.isArray( keys )? keys : keys.split('.');
      data = data[keys[0]];
        console.log(_.get(data, keys, defaultVal))
      if( data && keys.length>1 ){

        return get( data, keys.slice(1), defaultVal );
      }
      console.log(defaultVal)
      return data === undefined? defaultVal : data;
    }

      return data

  } catch(err) {
    console.error(err)
    alert(err)
  }
}

getData().then(data => {
    books = data.works
       })

       function displayTitles() {
         list.innerHTML = " "
         if (matches.length > 0){
         matches.forEach(match => {
         const li = document.createElement("li")
         li.style.cssText = "list-style: none; margin-left: 10px;"
         const link = document.createElement("a")
         link.style.cssText = "color: #000; margin: 10px;"
         link.id = "plot"
         link.href ="# "
         li.addEventListener("click", showPlot)
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

          function showPlot() {
             const getPlot = async () => {
               try {
                 const url = `https://openlibrary.org${key}.json`
                 const res = await fetch(url)
                 const data = await res.json()

                 console.log(data.description)

                 return  data

               } catch(err) {
                   console.log(err)
                 alert(err)
               }
             }

            getPlot().then(data => {
              const plotDes =  data.description
                console.log(typeof plotDes)
                para = document.createElement("p")
                displayPlot.style.display = "block"
                displayPlot.appendChild(para)
                para.classList.add("plot")
                para.textContent =  typeof plotDes === "string" ? plotDes : data.description.value
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
