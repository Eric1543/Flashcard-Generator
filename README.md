# Flashcard-Generator

This program allows the user to create flashcard objects with node.js through BASH. 

The user is prompted for how many cards to create and will then choose to create either a basic card or a cloze deleted card 
through the node inquirer package and the generated cards are then stored in a cards.txt file.

The BasicCard object has a front property with a question value and also a back property with the answer value.

The ClozeCard object has 3 properties - text, cloze, and partial. The text property is the full study sentence. The cloze
is the study word or phrase. And the partial property is the full study sentence minus the cloze portion.
