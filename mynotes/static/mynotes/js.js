document.addEventListener('DOMContentLoaded', function() {
  
  $(document).ready(function() {
    $('li.active').removeClass('active').removeAttr('aria-current');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active').attr('aria-current', 'page'); 
  });


  document.querySelectorAll('.chbox').forEach(function(swtch){
    swtch.addEventListener('click', shownotes);
  })


  document.querySelectorAll('.radio').forEach(function(swtch){
    swtch.addEventListener('click', shownotes);
  })

  
  notesdiv = document.querySelector('#notesdiv');
  if (notesdiv !=null) {
    notesdiv.querySelectorAll('.check').forEach(function(check){
      check.addEventListener('click', pick_category);
    })
  }

  
  const submit = document.querySelector('#submit');
  const newsect = document.querySelector('#newsect');
  if (submit !=null){
    submit.disabled = true;
    newsect.onkeyup = () => {
        if (newsect.value.length > 0) {
            submit.disabled = false;
        }
        else {
            submit.disabled = true;
        }
    }
  }

  
  document.querySelectorAll('.pencil').forEach(function(button){
    button.addEventListener('click', edit_note);
  })


  document.querySelectorAll('.trashbin').forEach(function(i){
    i.addEventListener('click', del_note);
  })


  document.querySelectorAll('.edcat').forEach(function(button){
    button.addEventListener('click', edit_cat);
  })


  document.querySelectorAll('.delcat').forEach(function(i){
    i.addEventListener('click', del_cat);
  })


  document.querySelectorAll('.rename').forEach(function(button){
    button.addEventListener('click', rename_section);
  })
  

});


function rename_section() {
  const ids = this.value;
  const id = parseInt(ids);
  const p1 = this.parentElement;
  const p2 = p1.parentElement;
  const p3 = p2.parentElement;
  const tr = p3.parentElement;            //это tr
  let dv = tr.querySelector('.cont')   // это родитель 
  let span = tr.querySelector('.secname')    // это span, он в родителе
  if (this.innerHTML == 'Rename') {
    this.innerHTML = 'Save';
    span.style.display = 'none'           //прячем span c именем, делаем новый вместо него
    let tx = document.createElement('textarea'); 
    tx.style.textAlign = 'left';
    tx.style.width = '12vw';
    tx.style.height = '3vw';
    tx.setAttribute('id', 'txedit');
    tx.innerHTML = span.innerHTML;  //присваиваем название
    dv.appendChild(tx);
  } else if (dv.querySelector('#txedit').value.length==0) {
    alert("Please input name");
  } else {
    this.innerHTML = 'Rename';
    const edtext = dv.querySelector('#txedit').value;
    span.innerHTML = edtext;
    const t = dv.lastElementChild; //наш созданный инпут
    dv.removeChild(t);
    span.style.display = 'block';
    fetch(`/rename/${id}`, {
      method: 'PUT',
      headers: {"X-CSRFToken": getCookie('csrftoken'),},           
      body: JSON.stringify({
         'edtext': edtext
      })
    })
  }
}


function shownotes() {
  const p1 = this.parentElement;  //form
  const p2 = p1.parentElement;    //td
  const tr = p2.parentElement;    //tr
  let notes = document.querySelectorAll('.dv');           //nodelist всех заметок
  let pagechecks = tr.querySelectorAll('.chbox:checked'); //nodelist чекнутых категорий страницы
  const pagechecksarray = [];
  for (const value of pagechecks.values()) {
    pagechecksarray.push(value.getAttribute('id'));       //array чекнутых категорий страницы
  }
  console.log(pagechecksarray);

  if (tr.querySelector('#allnotes').checked){             //если радио allnotes показываем все заметки
    for (let i = 0, div; div = notes[i]; i++) {
    div.style.display = 'block';   
    }

  } else {
    for (let i = 0, div; div = notes[i]; i++) {               //перебираем дивы
      let divchecks = div.querySelectorAll('.check:checked')  //nodelist чекнутых категорий дива
      const divchecksarray = [];
      for (const value of divchecks.values()) {
        divchecksarray.push(value.getAttribute('value'));     //array чекнутых категорий дива
      }
      console.log(divchecksarray);
      let intersection = divchecksarray.filter(x => pagechecksarray.includes(x));
      console.log(intersection);
      if (intersection.length > 0){
        div.style.display = 'block';
      } else {
        div.style.display = 'none';
      }
    }
  }
}


function pick_category() {
//  alert(this.id); 
  chosen = this.id
  console.log(this.id)
  const p1 = this.parentElement;
  const p2 = p1.parentElement;
  const p3 = p2.parentElement;
  const tr = p3.parentElement;   
  console.log(tr);
  const ids = tr.querySelector('.noteid').innerHTML;
  const id = parseInt(ids);
  if (this.checked) {
    fetch(`/pick/${id}`, {
      method: 'PUT',
      headers: {"X-CSRFToken": getCookie('csrftoken'),},           
      body: JSON.stringify({
         'category': chosen
      })
    })
  } else {
    fetch(`/pick/${id}`, {
      method: 'PUT',
      headers: {"X-CSRFToken": getCookie('csrftoken'),},           
      body: JSON.stringify({
         'category': chosen
      })
    })
  }}


function edit_note() {
  const p1 = this.parentElement;
  const p2 = p1.parentElement;
  const p3 = p2.parentElement;
  const tr = p3.parentElement;            //это tr
  let td = tr.querySelector('.roditel')   // это родитель нашего div
  let cont = tr.querySelector('.cont')    // это div, он в td - родителе
//  if (this.classList.contains == 'Edit') {
  let icon = this.querySelector('.mycl')
  if (icon.classList.contains('bi-pencil')) {  
//    this.innerHTML = 'Save';
    icon.classList.remove('bi-pencil');
    icon.classList.add('bi-clipboard-check');
    cont.style.display = 'none'           //прячем div c txt и url, делаем новый вместо него
    let tx = document.createElement('textarea'); 
    tx.style.textAlign = 'left';
    tx.style.width = '28vw';
    tx.setAttribute('id', 'txedit');
    tx.innerHTML = cont.querySelector('.texta').innerHTML;  //присваиваем содержание заметки
    let ur = document.createElement('textarea');
    ur.style.textAlign = 'left';
    ur.style.width = '28vw';
    ur.setAttribute('id', 'urledit');
    ur.setAttribute('placeholder', 'url if needed');
    ur.innerHTML = cont.querySelector('.urla').innerHTML;  //присваиваем url заметки
    let dv = document.createElement('div') // новый div вместо спрятанного
    dv.appendChild(tx);
    dv.appendChild(ur);
    td.appendChild(dv);
  } else {

//    this.innerHTML = 'Edit';
    icon.classList.remove('bi-clipboard-check');
    icon.classList.add('bi-pencil');
    const edtext = td.querySelector('#txedit').value;
    const edurl = td.querySelector('#urledit').value;
    const ids = tr.querySelector('.noteid').innerHTML;
    const id = parseInt(ids);
    cont.querySelector('.texta').innerHTML = edtext;
    cont.querySelector('.urla').innerHTML = edurl;
    const dv = td.lastElementChild; //наш созданный div
    td.removeChild(dv);
    cont.style.display = 'block';
    fetch(`/edit/${id}`, {
      method: 'PUT',
      headers: {"X-CSRFToken": getCookie('csrftoken'),},           
      body: JSON.stringify({
         'edtext': edtext, 'edurl': edurl
      })
    })
  }
}


function del_note() {
  const p1 = this.parentElement;          // не li, а btn  - видимо нажал на иконку, а не кнопку, соотв. button 
  const p2 = p1.parentElement;            
  const p3 = p2.parentElement;            
  const p4 = p3.parentElement;            
  const p5 = p4.parentElement;            
  const p6 = p5.parentElement;            // table
  const p7 = p6.parentElement;            // dv (заметка)
  const column = p7.parentElement;            // div (колонка) родитель
  const ids = p7.querySelector('.noteid').innerHTML;
  const id = parseInt(ids);
  column.removeChild(p7)
  fetch(`/delete/${id}`, {
    method: 'PUT',
    headers: {"X-CSRFToken": getCookie('csrftoken'),},           
    body: JSON.stringify({
       'status': 'deleted'
    })
  })
}


function edit_cat() {
  const p1 = this.parentElement;  //form
  const td = p1.parentElement;    //td
  if (this.classList.contains('bi-pencil')) {  
    this.classList.remove('bi-pencil');
    this.classList.add('bi-clipboard-check');
    p1.querySelector('label').style.display = 'none'           //прячем форму
    let tx = document.createElement('textarea'); 
    tx.style.textAlign = 'left';
    tx.style.width = '5vw';
    tx.style.height = '2vw';
    tx.setAttribute('id', 'txedit');
    tx.style.caretColor = 'auto'
    tx.innerHTML = p1.querySelector('.chbox').id;  //присваиваем содержание id (это название категории)
    p1.appendChild(tx);
  } else {
    this.classList.remove('bi-clipboard-check');
    this.classList.add('bi-pencil');
    const edtext = td.querySelector('#txedit').value;
    const ids = p1.querySelector('.chbox').value; // id категории лежит в value
    const id = parseInt(ids);
    p1.querySelector('label').innerHTML = edtext;
    p1.querySelector('label').setAttribute('for',edtext);
    p1.querySelector('.chbox').id = edtext;
    const t = p1.lastElementChild; //наш созданный text
    p1.querySelector('label').style.display = 'block';
    p1.removeChild(t);
    fetch(`/edcat/${id}`, {
      method: 'PUT',
      headers: {"X-CSRFToken": getCookie('csrftoken'),},           
      body: JSON.stringify({
         'edtext': edtext
      })
    })
  }
}


function del_cat() {
  const p1 = this.parentElement;          //form
  const td = p1.parentElement;            //td
  const ids = p1.querySelector('.chbox').value; // id категории лежит в value
  const id = parseInt(ids);
  td.style.display = 'none'
  fetch(`/delcat/${id}`, {
    method: 'PUT',
    headers: {"X-CSRFToken": getCookie('csrftoken'),},           
    })
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
