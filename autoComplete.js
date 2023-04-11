let input_value = document.getElementById("myInput");
const array = ["shadrack", "kinsimba", "paldueri", "gatmach", "riala", "kedok", "kelvin", "ken"];
input_value.addEventListener("click", () => {
  autocomplete(input_value, array);
});
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  let currentFocus = -1;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    let Div_parent1, Div_parent2, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    // currentFocus is set to - 1 because of an increment function that with access the current selected div containing the
    //solve the problem of current focus for being - 1
    // currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    Div_parent1 = document.createElement("div");
    Div_parent1.setAttribute("id", this.id + "autocomplete-list");
    Div_parent1.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(Div_parent1);
    /*for each item in the array...*/
    for (let i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        Div_parent2 = document.createElement("DIV");
        /*make the matching letters bold:*/
        Div_parent2.setAttribute("class", "Div_parent");
        let temp_paragraph = document.createElement("p");
        let temp_text = "<strong>" + arr[i].substr(0, val.length) + "</strong>" + arr[i].substr(val.length);
        temp_paragraph.innerHTML = temp_text;
        Div_parent2.appendChild(temp_paragraph);
        // Div_parent2.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        // Div_parent2.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        Div_parent2.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        Div_parent2.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        Div_parent1.appendChild(Div_parent2);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    //return the list of div elements in the parentNode
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*and and make the current item more visible:*/

      currentFocus++;
      addActive(x);
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
    } else if (e.keyCode == 38) { //up
      /*and and make the current item more visible:*/
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/


      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    // update the currentFocus state 
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");

  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt = null) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists();
  });
}