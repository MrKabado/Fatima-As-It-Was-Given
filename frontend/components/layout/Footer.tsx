"use client";

import { useRef, useEffect, HTMLAttributes } from "react";
import { htmlContainerStore } from "@/stores/htmlContainerStore";
import { authStore } from "@/stores/authStore";

interface ControlledEditableProps extends HTMLAttributes<HTMLDivElement> {
  isEditable: boolean;
  content: string;
  identifier: string;
  onContentChange?: (content: string) => void;
  className?: string;
  as?: 'div' | 'span';
}

function ControlledEditable({
  isEditable,
  content,
  identifier,
  onContentChange,
  className = '',
  as = 'div',
  ...props
}: ControlledEditableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { updateContainer, setContainerContent } = htmlContainerStore();
  const { isAutheticated } = authStore();

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = content;
    }
  }, [content]);

  const handleBlur = async () => {
    if (!isAutheticated) {
      if (ref.current) {
        ref.current.innerHTML = content;
      }
      return;
    }

    if (isEditable && isAutheticated && ref.current) {
      const newContent = ref.current.innerHTML;

      if (newContent === content) {
        return;
      }

      setContainerContent(identifier, newContent);

      if (onContentChange) {
        onContentChange(newContent);
      } else {
        try {
          const success = await updateContainer(
            identifier,
            newContent
          );
          if (success) {
            console.log('Content saved successfully:', identifier);
          } else {
            console.error('Failed to save content:', identifier);
          }
        } catch (error) {
          console.error('Error saving content:', error);
        }
      }
    }
  };

  const canEdit = isEditable && isAutheticated;

  const Component = as === 'span' ? 'span' : 'div';

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      contentEditable={canEdit}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      className={className}
      {...props}
    />
  );
}

interface FooterProps {
  isEditable?: boolean;
}

export default function Footer({ isEditable = false }: FooterProps) {
  const { isAutheticated } = authStore();
  const { getContainerContent, updateContainer } = htmlContainerStore();

  const defaultContent = {
    'footer-component-copyright': '2025 FATIMA: A Call To Salvation',
    'footer-component-tagline': 'Not A Promise Of Peace, But A Remedy For Souls',
    'footer-component-legal': 'This work is shared freely in the hope that it may be read with sincerity, and passed on with care. All content is presented faithfully without alteration or reinterpretation.',
    'footer-component-contact-text': 'Those who wish to discuss, publish, or reference this material may contact:',
    'footer-component-email': 'mickken@hotmail.com',
    'footer-component-hearts': 'In the Twin Equal Hearts of Jesus and Mary...',
  };

  const getContent = (identifier: string): string => {
    const content = getContainerContent(identifier);
    return (
      content ||
      defaultContent[identifier as keyof typeof defaultContent] ||
      ''
    );
  };

  const handleContentChange = async (identifier: string, content: string) => {
    if (!isAutheticated) {
      console.warn(
        'Unauthorized: Cannot update content without authentication'
      );
      return;
    }
    try {
      const success = await updateContainer(identifier, content);
      if (success) {
        console.log('Content saved successfully:', identifier);
      } else {
        console.error('Failed to save content:', identifier);
        alert('Failed to save content. Please try again.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content. Please try again.');
    }
  };

  return (
    <footer className="flex flex-col bg-gray-50 text-gray-600 py-6 mt-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-center md:text-left mb-4">
            <h1 className="text-[#2C3E50] font-serif font-bold text-lg flex items-center justify-center md:justify-start">
              <span className="text-xl mr-2">©</span> 
              <span>
                <ControlledEditable
                  isEditable={isEditable && isAutheticated}
                  content={getContent('footer-component-copyright')}
                  identifier="footer-component-copyright"
                  onContentChange={(content) => handleContentChange('footer-component-copyright', content)}
                  className=""
                />
              </span>
            </h1>
            <p className="text-gray-500 text-sm italic mt-1 font-serif">
              <ControlledEditable
                isEditable={isEditable && isAutheticated}
                content={getContent('footer-component-tagline')}
                identifier="footer-component-tagline"
                onContentChange={(content) => handleContentChange('footer-component-tagline', content)}
                className="text-gray-500 text-sm italic font-serif"
                as="span"
              />
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-5 w-full">
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-center md:text-left">
                <span className="font-bold text-gray-700">Legal Notice:</span>{" "}
                <ControlledEditable
                  isEditable={isEditable && isAutheticated}
                  content={getContent('footer-component-legal')}
                  identifier="footer-component-legal"
                  onContentChange={(content) => handleContentChange('footer-component-legal', content)}
                  className="text-sm leading-relaxed"
                  as="span"
                />
              </p>
              
              <p className="text-sm leading-relaxed text-center md:text-left">
                <ControlledEditable
                  isEditable={isEditable && isAutheticated}
                  content={getContent('footer-component-contact-text')}
                  identifier="footer-component-contact-text"
                  onContentChange={(content) => handleContentChange('footer-component-contact-text', content)}
                  className="text-sm leading-relaxed"
                  as="span"
                />{" "}
                <a 
                  href={`mailto:${getContent('footer-component-email')}`}
                  className="text-[#2C3E50] hover:text-[#8B7355] transition-colors duration-200"
                >
                  <ControlledEditable
                    isEditable={isEditable && isAutheticated}
                    content={getContent('footer-component-email')}
                    identifier="footer-component-email"
                    onContentChange={(content) => handleContentChange('footer-component-email', content)}
                    className="text-[#2C3E50]"
                    as="span"
                  />
                </a>
              </p>
              
              <div className="text-center md:text-left pt-2">
                <p className="text-sm font-serif italic text-gray-500">
                  <ControlledEditable
                    isEditable={isEditable && isAutheticated}
                    content={getContent('footer-component-hearts')}
                    identifier="footer-component-hearts"
                    onContentChange={(content) => handleContentChange('footer-component-hearts', content)}
                    className="text-sm font-serif italic text-gray-500"
                    as="span"
                  />
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400 text-center w-full">
            <p>A site dedicated to preserving the original testimony of Fatima</p>
          </div>
        </div>
      </div>
    </footer>
  ); 
}