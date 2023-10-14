Main idea:
- Idea of the project is to make a note keeping system with sorting filters like MsExcel have. In fact before I was doing a lot of notes and 'to do' lists in MsExcel because of Excel's filters and I wanted to make something lighter, faster and better visualized to cover all needs for notes and to do-s in every aspect of life. It can be memory notes on house or car specifications, to-do lists, thoughts on movies or articles, Python examples or theory.  
- The app has pages - sections, and structure of each "section" is similar - section/categories/notes, but the intent of created section can be very different. One section can be used for short memory notes or "To do-s" with few categories, and another section can be python training notes with lot of categories.


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


Short youtube presentation:
https://youtu.be/hoqzkr8bLMc


How to run application: 
- Download the distribution code from GIT 
- In your terminal, cd into the MyNotes directory. 
- install python and django if not installed
- run in your terminal: python manage.py runserver
- you can log in as Frodo with password 12 or register as a new user


Every file content at static and templates folders: 
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
