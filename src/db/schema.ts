import { pgTable, text, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const blogs = pgTable('blogs', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content'),
  category: text('category'),
  author: text('author'),
  date: text('date'),
  readTime: text('read_time'),
  image: text('image'),
  likes: integer('likes').default(0),
  commentsCount: integer('comments_count').default(0),
  tags: jsonb('tags'),
  featured: boolean('featured').default(false),
  updatedDate: text('updated_date')
});

export const gallery = pgTable('gallery', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  tags: jsonb('tags'),
  type: text('type'),
  size: text('size'),
  url: text('url'),
  date: text('date'),
  photographer: text('photographer'),
  desc: text('desc'),
  timestamp: text('timestamp')
});

export const submissions = pgTable('submissions', {
  id: text('id').primaryKey(),
  data: jsonb('data')
});
