    document.addEventListener('DOMContentLoaded', () => {
      fetchPosts();
  });
  
  async function fetchPosts() {
      try {
          const response = await fetch('https://lisvvx9ca9.execute-api.us-east-1.amazonaws.com/default/get_posts');
          const data = await response.json();
          createAccordion(data);
          createMenu(data);
      } catch (error) {
          console.error('Erro ao buscar posts:', error);
      }
  }
  
  function createAccordion(posts) {
      const accordion = document.getElementById('accordionPosts');
      posts.forEach((post, index) => {
          const card = document.createElement('div');
          card.className = 'accordion-item';
  
          const header = document.createElement('h2');
          header.className = 'accordion-header';
          header.id = `heading${index}`;
  
          const button = document.createElement('button');
          button.className = 'accordion-button collapsed';
          button.type = 'button';
          button.setAttribute('data-bs-toggle', 'collapse');
          button.setAttribute('data-bs-target', `#collapse${index}`);
          button.setAttribute('aria-expanded', 'false');
          button.setAttribute('aria-controls', `collapse${index}`);
          button.textContent = post.theme;
  
          const collapse = document.createElement('div');
          collapse.id = `collapse${index}`;
          collapse.className = 'accordion-collapse collapse';
          collapse.setAttribute('aria-labelledby', `heading${index}`);
          collapse.setAttribute('data-bs-parent', '#accordionPosts');
  
          const body = document.createElement('div');
          body.className = 'accordion-body';
          body.innerHTML = post.content.S;
  
          header.appendChild(button);
          collapse.appendChild(body);
          card.appendChild(header);
          card.appendChild(collapse);
          accordion.appendChild(card);
      });
  }
  
  function createMenu(posts) {
      const menu = document.getElementById('menu');
      const list = document.createElement('ul');
      list.className = 'list-group';
  
      posts.forEach((post, index) => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
  
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = post.theme;
          link.addEventListener('click', () => openModal(post));
  
          listItem.appendChild(link);
          list.appendChild(listItem);
      });
  
      menu.appendChild(list);
  }
  
  function openModal(post) {
      const modalTitle = document.getElementById('postModalLabel');
      const modalContent = document.getElementById('postModalContent');
  
      modalTitle.textContent = post.theme;
      modalContent.innerHTML = post.content;
  
      const modal = new bootstrap.Modal(document.getElementById('postModal'));
      modal.show();
  }