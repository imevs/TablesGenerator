# TablesGenerator
Demo react app that allows filling and copying of table data.
Application is based on Create React App and uses Typescript, CSS Modules, and React Hooks.

# Manual for application
Application contain a form and a table that displays data entered through form. Form has next fields to describe a person data:
Name, SurName, Age, City. All fields are mandatory. Above table there is a button to copy data to new table.
A new table with copied data could be removed (first table could not be removed), edited or copied again in new table.
Each item of table could be edited via modal form.
Next actions require confirmation: removal of table, saving of edited data.
Item of table could be removed with corresponding Delete button.
Removal of table's item does not require confirmation but it is possible to restore data within 5 seconds.

# Notes
* CSS Modules approach was used for styles. so BEM style is not really necessary,
    and it was used just for demonstration only at Table component, in real application I would prefer shorter names.
* BEM notation: blockName__elementName_modificator

# Demo

https://user-images.githubusercontent.com/1301697/142780604-4cf1103a-7f62-489d-85d4-80a54d52ecdd.mov
