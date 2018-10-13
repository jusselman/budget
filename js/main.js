
//budget controller//

var budgetController = (function() {

    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // create new ID //
            if (data.allItems[type].length > 0) {
              ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
              ID = 0;
            }


            // create new item based on 'inc' or 'exp' type//
            if (type === 'exp') {
            newItem = new Expense(ID, des, val);
          } else if (type === 'inc'){
            newItem = new Income(ID, des, val);
          }

          //push it into ur data structure //
          data.allItems[type].push(newItem);

          // Return the new element //
          return newItem;

        },

        testing: function() {
          console.log(data);
        }
    };

})();


//UI controller //
var UIController = (function() {
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };
    return {
      getInput: function() {
        return {
        type: document.querySelector(DOMStrings.inputType).value, // either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },

    getDOMStrings: function() {
      return DOMStrings;
    }

    }

})();

//Global app controller //
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function () {

    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      ctrlAddItem();
    }
  });

};




  var ctrlAddItem = function() {
    var input, newItem;
    // grab the input data //
    var input = UICtrl.getInput();
    console.log(input);

    //add the item to budget controller //
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // add the new item to user interface //

    // calculate the budget //

    // display the budget //
  };

  return {
    init: function() {
      setupEventListeners();
    }
  };


  })(budgetController, UIController);


controller.init();
