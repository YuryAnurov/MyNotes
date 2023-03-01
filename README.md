Distinctiveness and Complexity: 

To defend project complexity I'll start with idea and proceed with technical solutions which were new for me when working on project: 

- idea of the project is to make a note keeping system with sorting filters like MsExcel have. In fact before I was doing a lot of notes and 'to do' lists in MsExcel because of Excel's filters and I wanted to make something lighter, faster and better visualized to cover all needs for notes and to do-s in every aspect of life. It can be memory notes on house or car specifications, to-do lists, thoughts on movies or articles, Python examples or theory. As for distinctiveness - we didn't do anything like that neither in network, nor in commerce, mail, wiki and search.  

Technical solutions new for me versus previous projects: 
- comparing arrays in javascript: The main idea of the project - to show only notes with picked categories required comparing of two arrays - picked categories on the page and picked categories for the note. This was done with getting first nodelists, then arrays, then getting intersection of arrays.  

- 2 and 4 columns on the page: though html theory was covered in lection1, I've never practiced "flex" + I had to find out how to fill columns with different data in Python. 

- 2 blocks in layout.html: in all previous projects it was enough to have one block in layout.html. I even didn't know that it is possible to have more, but having variable number of tabs had to find out how to use it.  

- nav bar with active page: As there is variable amount of pages with similar view - it was necessary to make clear at what section we are. Unexpectedly, it took some time to find out, how to make it work with bootstrap4 

- 2 separate htmls for include: Though structure of each page "section" is similar - section/categories/notes, but the intent of created section can be very different. One section can be used for short memory notes or "To do-s" with few categories, and another section can be python training notes with lot of categories. That is why I wanted to adjust size of note, depending on amount of categories on section page. To allow both - possibility to use many categories and to keep good visibility of note content in most cases, when we have only few categories. I used "if" with 3 different amount of categories, repeating almost the same html - this was handled with "include" and separate htmls. 

- favicon.ico: Trying to get rid of annoying error messages in browser console, discovered that favicon is a nice thing to have for the application and created it 


Every file content: 
- js.js - all javascript code 
- styles.css - css 
- favicon.ico - project icon 
- login.html + register.html - login and register pages 
- layout.html - layout for most other htmls 
- addsection.html - page for creating new section 
- index.html - all notes page (index) + section pages 
- notes.html - file for inclusion in index.html 
- archived.html - page for archived sections and notes 
- arcnotes.html - file for inclusion in archived.html 

How to run application: 
- Download the distribution code from GIT 
- In your terminal, cd into the YuryAnurov directory. 
- run python manage.py makemigrations mynotes 
- run python manage.py migrate 
- run python manage.py runserver 

Specification: 
1. "Welcome page":
- Not logged in users cannot do anything in this app, as said in special message.  
- Users who are just registered and signed in and did not make any section before will see themselves on the "Add section page". 
- If the user is not new, he will see all his notes from all sections on the welcome page. 
2. "Add section". Logged in users can add a section/s for notes by pushing "+".  
3. "Section view". After adding new section - a new section page appears, where a user can start placing notes. There are two input fields - for note and for url. New notes appear below in 2 columns. There is a panel for making categories of notes and selecting, which categories we should see. Radio button enables/disables applied filters. On the same panel there is a "Archive" button, which can send section to the Archive page. 
4. "Categories". We can add unique categories for every section. After entering this category appears as a checkbox on the category panel and on every note of the section 
5. "Note". After placing the note we can edit it - both the note and the url and we can delete it. We can also select different categories we entered for this section - from none to all. Depending on selected categories on the page this note can disappear or appear if at least one of its categories is selected at categories panel. 
6. "Archive view". All archived sections with contained notes + deleted notes we can see at Archive page. We can restore section and it disappears from Archive view with all contained notes. But we can not restore individually deleted notes. 