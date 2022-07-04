import React from 'react';
import { Postitem } from './Postitem';

export const Postlist = ({ posts, title, remove }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      {posts.map((post) => (
        <Postitem remove={remove} post={post} key={post.id} />
      ))}
    </div>
  );
};
