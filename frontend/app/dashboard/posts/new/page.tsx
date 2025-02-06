"use client"

// pages/post-editor.jsx
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

export default function PostEditor() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  // Ссылка на input для выбора файлов (изображения)
  const fileInputRef = useRef(null);

  // Инициализируем Tiptap‑редактор с базовым набором расширений и поддержкой изображений
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '<p>Начните писать...</p>',
  });

  // Функция для открытия диалога выбора файла
  const addImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Обработка загрузки изображения:
  // 1. Выбираем файл через невидимый input
  // 2. Отправляем файл на бэкенд через API `/api/images/`
  // 3. Получаем URL и вставляем изображение в редактор
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:8000/api/images/', {
        method: 'POST',
        body: formData,
        // Если API требует авторизации через cookie, раскомментируйте:
        // credentials: 'include',
      });

      if (!res.ok) {
        console.error('Ошибка загрузки изображения');
        return;
      }
      const data = await res.json();
      const imageUrl = data.url; // Ожидается, что API вернёт объект { url: "..." }

      // Вставляем изображение в текущее положение курсора
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
    }
  };

  // Отправка поста на API. Собираем HTML-содержимое редактора и заголовок.
  const handleSubmit = async () => {
    if (!editor) return;

    const content = editor.getHTML();
    const post = {
      title,
      content,
      is_published: true, // или false, в зависимости от логики
    };

    try {
      const res = await fetch('http://localhost:8000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Если требуется аутентификация через cookie, возможно, понадобится:
          // credentials: 'include',
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        console.error('Не удалось создать пост');
        return;
      }
      const data = await res.json();
      // После успешного создания можно, например, перейти на страницу созданного поста:
      router.push(`/posts/${data.slug}`);
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Новый пост</h1>
      <input
        type="text"
        placeholder="Заголовок поста"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />

      {/* Кнопка для добавления изображения */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={addImage} style={{ padding: '8px 12px' }}>
          Вставить изображение
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Сам редактор */}
      <EditorContent editor={editor} />

      <button
        onClick={handleSubmit}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Опубликовать
      </button>
    </div>
  );
}
