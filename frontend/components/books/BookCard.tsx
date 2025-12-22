"use client";

export default function BookCard({ title, author, description, link }: { title: string; author: string; description: string; link: string; }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"> 
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-md italic mb-2">by {author}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Learn More
      </a>
    </div>
  );
} 