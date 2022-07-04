import React, { useRef, useState, useMemo } from 'react';
import { Postlist } from './components/Postlist';
// import { Postitem } from './components/Postitem';
import './styles/app.css';
// import mainClasses from './styles/app.module.css';
import { MyButton } from './components/UI/button/MyButton';
import { MyInput } from './components/UI/input/MyInput';
import { PostForm } from './components/PostForm';
import { MySelect } from './components/UI/select/MySelect';

// import ClassCounter from './components/classCounter';
// import { useState } from 'react';
// import Counter from './components/counter';
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'aa', body: 'cc' },
    { id: 2, title: 'bb 2', body: 'bb' },
    { id: 3, title: 'cc 3', body: 'aa' },
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
    console.log('Отработала');
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLowerCase().includes(searchQuery));
  }, [searchQuery, sortedPosts]);

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className='App'>
      <PostForm create={createNewPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Поиск'></MyInput>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Сортировка'
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
      {sortedAndSearchedPosts.length ? (
        <Postlist remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      )}
    </div>
  );
}
export default App;
