
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.getElementById('toy-collection')
const inputName = document.getElementsByClassName('input-text')[0]
const inputImg = document.getElementsByClassName('input-text')[1]
// console.log(inputName) console.log(inputImg)

let addToy = false

// fetch all toys,make <div class="card"> for each one
// put to id "toy-collection"
// show toy info(toy's name, img, likes, like-btn)

fetch("http://localhost:3000/toys")
.then(res=>res.json())
.then(toys=>{
  toys.forEach(toy=>{
    renderToys(toy)
  })
  toyContainer.addEventListener('click',handleLikeBtn)
})

function renderToys(toy){
toyContainer.innerHTML += `
<div class="card" id=${toy.id}>
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
</div>
`
}
//create toy to card, submit form
//POST to http://localhost:3000/toys
toyForm.addEventListener('submit', e=>{
  e.preventDefault()
  // console.log(e.target)
  fetch('http://localhost:3000/toys',{
      method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      body:JSON.stringify({
        name: inputName.value,
        image: inputImg.value,
        likes: 0
      })
  })
  .then(res=>res.json())
  .then(
    // console.log
    toy=>{
    renderToys(toy)}
  )
form.reset()
})

//increase likes when click like-btn
//PATCH to http://localhost:3000/toys/:id
function handleLikeBtn(e){
  // console.log(e.target.className)
  // console.log(e.target.parentElement.id)
  if(e.target.className == 'like-btn'){
    // console.log(e.target.previousElementSibling)
    let likes = e.target.previousElementSibling
    // console.log(likes)
    let likesCount = parseInt(likes.innerText, 10)
    // console.log(likesCount)
    likes.innerText = `${++likesCount} likes`
    let toyId = e.target.parentElement.id
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body:JSON.stringify({
      likes: likesCount
    })
  })

  }
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})
