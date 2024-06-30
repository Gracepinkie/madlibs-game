/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */

//loading

document.addEventListener('DOMContentLoaded', (event) => {
   window.onload = () => {
       const loader = document.getElementById('loader');
       const gameContent = document.getElementById('game-content');
      
       // Simulate game loading time with a timeout
       setTimeout(() => {
           loader.style.display = 'none';
           gameContent.style.display = 'flex';
       }, 3000); // Adjust the timeout duration as needed
   };
 });


// This function takes a raw story string as input and processes it to identify and categorize words based on placeholders 

function parseStory(rawStory) {
  // Define regular expressions to match punctuation and placeholders
  const posPatterns = {
      noun: /\[n\]/,
      verb: /\[v\]/,
      adj: /\[a\]/,

  };

  const objArr = [];

   // Replace punctuation with spaced versions
  rawStory = rawStory.replace(/[.]/g, " .").replace(/[,]/g, " ,");
  const words = rawStory.split(" ");

    // Loop through each word in the story
  words.forEach(word => {
      for (const [pos, pattern] of Object.entries(posPatterns)) {
          if (pattern.test(word)) {
              objArr.push({ word: word.replace(pattern, ''), pos });
              return;
          }
      }
      objArr.push({ word });
  });

  return objArr;
}

// /**
//  * All your other JavaScript code goes here, inside the function. Don't worry about
//  * the `then` and `async` syntax for now.
//  *
//  * NOTE: You should not be writing any code in the global namespace EXCEPT
//  * declaring functions. All code should either:
//  * 1. Be in a function.
//  * 2. Be in .then() below.
//  *
//  * You'll want to use the results of parseStory() to display the story on the page.
//  */
//It loops through the parsed story array and creates input fields for words that need user input, and spans for the preview area. Words without placeholders are directly added as text.


getRawStory()
  .then(parseStory)
  .then((processedStory) => {
      initializeMadLibs(processedStory);
  });

function initializeMadLibs(stories) {
  madLibsEdit(stories);
  madLibsPreview();
  hotkeyEnter();
  loadInputs();
  clearInputs();
  initializeTranslation();
}

function madLibsEdit(stories) {
  const edit = document.querySelector(".madLibsEdit");
  const p = document.createElement("p");
  const preview = document.querySelector(".madLibsPreview");
  const pre = document.createElement("p");

  edit.appendChild(p);
  preview.appendChild(pre);

  stories.forEach(story => {
      if (story.pos) {
          const input = document.createElement("input");
          input.placeholder = story.pos;
          input.id = `story-input${p.childElementCount}`;
          input.maxLength = 20;
          input.style.width = "50px"; 
          input.setAttribute("maxlength", "10");
          input.style.width = "40px"; 
          input.style.border = "none"; 
          input.style.backgroundColor = "transparent"; 
          input.style.opacity = "1"; 
          input.style.color = "antiquewhite"
          p.appendChild(input);

          const span = document.createElement("span");
          span.id = `input-val${pre.childElementCount}`;
          span.innerText = "______";
          pre.appendChild(span);
      } else {
          p.innerHTML += ` ${story.word} `;
          pre.innerHTML += ` ${story.word} `;
      }
  });
}

function madLibsPreview() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, i) => {
      input.addEventListener("input", () => {
          localStorage.setItem(input.id, input.value);
          const span = document.querySelector(`#input-val${i}`);
          span.innerText = input.value || "______";
          input.className = input.value ? "opacity" : "no-opacity";
      });
  });
}

function hotkeyEnter() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, i) => {
      input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
              const nextInput = document.querySelector(`#story-input${(i + 1) % inputs.length}`);
              nextInput.focus();
          }
      });
  });
}

function loadInputs() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, i) => {
      const value = localStorage.getItem(input.id);
      if (value) {
          input.value = value;
          const span = document.querySelector(`#input-val${i}`);
          span.innerText = value;
          input.className = "opacity";
      }
  });
}

function clearInputs() {
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input, i) => {
          input.value = "";
          input.className = "no-opacity";
          document.querySelector(`#input-val${i}`).innerText = "______";
      });
      localStorage.clear();
  });
}

//translation
/* I added an event listner so that the translation scripts only activates when button is clicked */




//  function initializeTranslation() {
//    i18next.init({
//             lng: 'en',
//        debug: true,
//         resources: {
//             en: { translation: { key: "Seeking refuge[n] from the eternal[a] conflict between the High Heavens[n] and the Burning[v] Hells[n],Inarius and Lilith formed Sanctuary and gave[v] life to the Nephalem with the stolen[v] Worldstone[n].Fearing for the destruction[v] of her hybrid[n] offspring, Lilith led a violent[v], protective[v] act to protect[v],the Nephalem, Save humanity[n] or perish[v]!" }},
//             tr: { translation: { key: "Ukufuna ukuphunyuka[n] empini engapheli[a] phakathi kweZulu[n] Eliphakeme neziHogo Ezishisayo[v],u-Inarius noLilith benza i-Sanctuary futhi banika[v] ukuphila kumaNephalem ngeWorldstone ebebiwe[v].Besaba ukubhujiswa[v] kwezingane zakhe ezihlanganisiwe[n], uLilith wahola isenzo esinodlame[v] nesivikelo[v] ukuvikela amaNephalem.Siza isintu[n] noma ufe[v]!" }},
//        }
//    }, (err, t) => {
//        const button = document.querySelector("#tr");
//         let isZulu = false;

//         button.addEventListener("click", () => {
//             isZulu = !isZulu;
//             button.innerText = isZulu ? "English" : "isiZulu";
//             updateContent(isZulu);
//         });
//     });
//   }

//   function updateContent(isZulu) {
//     const storyKey = i18next.t('key');
//     const processedStory = parseStory(storyKey);
//     document.querySelector(".madLibsEdit").innerHTML = "Ukufuna ukuphunyuka[n] empini engapheli[a] phakathi kweZulu[n] Eliphakeme neziHogo Ezishisayo[v],u-Inarius noLilith benza i-Sanctuary futhi banika[v] ukuphila kumaNephalem ngeWorldstone ebebiwe[v].Besaba ukubhujiswa[v] kwezingane zakhe ezihlanganisiwe[n], uLilith wahola isenzo esinodlame[v] nesivikelo[v] ukuvikela amaNephalem.Siza isintu[n] noma ufe[v]!";
//     document.querySelector(".madLibsPreview").innerHTML = "Ukufuna ukuphunyuka[n] empini engapheli[a] phakathi kweZulu[n] Eliphakeme neziHogo Ezishisayo[v],u-Inarius noLilith benza i-Sanctuary futhi banika[v] ukuphila kumaNephalem ngeWorldstone ebebiwe[v].Besaba ukubhujiswa[v] kwezingane zakhe ezihlanganisiwe[n], uLilith wahola isenzo esinodlame[v] nesivikelo[v] ukuvikela amaNephalem.Siza isintu[n] noma ufe[v]!";
//     document.querySelector("h1").innerHTML = "Wamukelekile kwa-Lasha";
//     document.querySelector(".top1").innerHTML = "Ezulwini";
//     document.querySelector(".top2").innerHTML = "Esihogweni"

//     createHTMLElements(isZulu);
//     madLibsEdit(processedStory);
//     madLibsPreview();
//     hotkeyEnter();
//     loadInputs();
//     clearInputs();
//     initializeTranslation();
//   }

//     function createHTMLElements(isZulu) {
//     const madLibsEdit = document.querySelector(".madLibsEdit");
//     const madLibsPreview = document.querySelector(".madLibsPreview");

//     const h3Edit = document.createElement("h3");
//     const h3Preview = document.createElement("h3");
//     const h1edit = document.createElement("h1");

//     translateButton.id = "tr";
//     h3Edit.innerText = isZulu ? "Izulu Eliphezulu" : "Hight Heavens";
//     h3Preview.innerText = isZulu ? "Esihogweni" : "Sanctuary";
//     h1edit.innerText = isZulu ? "Welcome to Hell" : "Wafika kwa-Lasha!";


//   madLibsEdit.appendChild(h3Edit);
//   madLibsEdit.appendChild(translateButton);
//   madLibsPreview.appendChild(h3Preview);
//   h1edit.appendChild(h1edit);
// }

