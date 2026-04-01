const form = document.querySelector('form');
      const fileInput = form.querySelector('input[type="file"]');
      const nameInput = form.querySelector('input[type="text"]');
      const textInput = form.querySelector('textarea');
      const gallery = document.getElementById('gallery');

      // Load saved images from localStorage
      const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
      savedImages.forEach(src => addImageToGallery(src));

      function addImageToGallery(src) {
        const img = document.createElement('img');
        img.src = src;
        img.style.width = '100%';
        img.style.borderRadius = '12px';
        gallery.appendChild(img);
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const file = fileInput.files[0];
        const name = nameInput.value.trim();
        const text = textInput.value.trim();

// Validation
        if (!file || !name || !text) {
          alert('Please fill out all fields and upload an image before submitting.');
          return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
          const imageSrc = event.target.result;

          // Save to localStorage
          const existing = JSON.parse(localStorage.getItem('galleryImages')) || [];
          existing.push(imageSrc);
          localStorage.setItem('galleryImages', JSON.stringify(existing));

          addImageToGallery(imageSrc);
        };
        reader.readAsDataURL(file);

        form.reset();
      });