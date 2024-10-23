/**
 * Data
 */
pavingPallettes = [
  { name: "Grey", color: "#a0a0a1", quantity: 32 },
  { name: "Beige", color: "#e0c9ac", quantity: 28 },
  { name: "Natural", color: "#bcb8b0", quantity: 24 },
  { name: "Black", color: "#404039", quantity: 20 },
  { name: "White", color: "#ffffff", quantity: 16},
  { name: "Brown", color: "#8a8173", quantity: 12 },
  { name: "Buff", color: "#c6b9a9", quantity: 8 },
  { name: "Blue", color: "#7583ac", quantity: 8 },
  { name: "Green", color: "#868f78", quantity: 4 },
  { name: "Charcoal", color: "#5f6060", quantity: 4 },
  { name: "Yellow", color: "#f3e6b3", quantity: 4 },
  { name: "Cream", color: "#f8f1ea", quantity: 4},
  { name: "Silver", color: "#c2c2c2", quantity: 4 },
  { name: "Red", color: "#81483a", quantity: 4 },
  { name: "Orange", color: "#b3624e", quantity: 4 },
];

/**
 * IIFE for main application
 */
const app = (function () {
  const initPavingPallettes = (function () {
    var pavingPalletteHTML = "";
    /* Minimum darkest colour that requires border around it. The border will show over this and other light colors e.g. white etc.*/
    var darkestColorForBorder = "f8f1ea";
    var darkestColorForBorderDec = parseInt("0x" + darkestColorForBorder, 16);

    pavingPallettes.map(function (item) {
      var isBorderRequuired =
        parseInt("0x" + String(item.color).substring(1), 16) >=
        darkestColorForBorderDec
          ? true
          : false;
      if (isBorderRequuired) {
        pavingPalletteHTML +=
          '<div class="ls-f-colours-element"><label class="ls-f-colours-label">' +
          item.name +
          '<input type="checkbox" /><span class="ls-f-colours-circle"style="background-color: ' +
          item.color +
          '; border: 1px solid #404039;box-sizing:content-box;"></span></label><span class="quantity">(' +
          item.quantity +
          ")</span></div>";
      } else {
        pavingPalletteHTML +=
          '<div class="ls-f-colours-element"><label class="ls-f-colours-label">' +
          item.name +
          '<input type="checkbox" /><span class="ls-f-colours-circle"style="background-color: ' +
          item.color +
          ';"></span></label><span class="quantity">(' +
          item.quantity +
          ")</span></div>";
      }
    });
    document.getElementById("ls-f-colours-container").innerHTML =
      pavingPalletteHTML;

    {
      /* Mock HTML of above iteration to simplify markup

      <div class="ls-f-colours-element">
        <label class="ls-f-colours-label">
          Grey
          <input type="checkbox" />
          <span
            class="ls-f-colours-circle"
            style="background-color: '#ffffff'; border: 1px solid #404039;"
          ></span>
          <span class="quantity">(32)</span>
        </label>
      </div>
    */
    }
    
  })();
})();
