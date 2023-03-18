//API_URL="http://127.0.0.1:5000/thisorthat?q=test@gmail.com"
API_URL="http://sandeep1dimri.pythonanywhere.com/thisorthat?q=test@gmail.com"

async function getChoices(url){

    const res = await fetch(url)
    const data= await res.json()
    show_This_or_That(data['Choices'])

}
getChoices(API_URL)
const this_or_that_options= ["Run or Gym", "Book or Video", "Weekend or Weekdays","this or That"];


const main= document.getElementById('main');
const form= document.getElementById("form")

const number=document.getElementById('number')


// add a listener to form input
form.addEventListener('submit',(e) => {
    e.preventDefault()
    const search= document.getElementById("number")

    //search the element, move to element and color it for few secs
    try{
        let search_element=document.getElementById('container'+search.value)

        let is_card_flipped = search_element.getElementsByClassName('card-front-hidden').length > 0 ? true : false
        if (is_card_flipped) {
            alert ("Select another number") // card already flipped
            search.value=''
        }
        else{
        search_element.scrollIntoView()

        let card_number=search_element.getElementsByClassName('top-right')[0]
        card_number.classList.remove('top-right')
        card_number.classList.add('top-right-blink')
        card_number.classList.add('blinking')
        search.value=''
        }

     }
    catch(error)
    {
        alert("Select another number!!")
    }


})

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;


    while (currentIndex != 0) {


      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;


      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  shuffle(this_or_that_options)


  function show_This_or_That(cards){

    number.setAttribute("placeholder",`Number between 1 to ${cards.length}`)

    shuffle(cards)
    main.innerHTML=''

    // loop an array and build the element
    for (var i=0; i < cards.length; i ++){
        const each_card_EL=document.createElement('div')
        each_card_EL.classList.add('container')
        each_card_EL.setAttribute("id",'container'+ (i+1))
        each_card_EL.innerHTML=`

                <div class="card-front">
                    <img src="static/thisorthat1.0.png" alt="">
                    <h2 id="card_number" class="top-right">
                        ${i+1}
                    </h2>
                </div>
                <div class="card-back">
                    <h3  id="this_or_that_option" class="info">
                        ${cards[i]}
                    </h3>
                </div>

        `
        each_card_EL.addEventListener("click",card_clicked,i)
        main.append(each_card_EL)
    }


  }
  show_This_or_That(this_or_that_options)

  function card_clicked(e){

    let card=document.getElementById(e.currentTarget.id)
    let card_f=card.getElementsByClassName("card-front")[0]
    card_f.classList.remove("card-front")
    card_f.classList.add("card-front-hidden")

    let card_b=card.getElementsByClassName("card-back")[0]

    card_b.classList.remove("card-back")
    card_b.classList.add("card-back-visible")


  }
  window.addEventListener('beforeunload', function (e) {
    console.log("Refresh will restart the This or That,so alerted")
    e.preventDefault(); // if default is blocked, will receive a warning
    e.returnValue = '';

});

