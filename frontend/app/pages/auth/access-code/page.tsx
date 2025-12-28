"use client";

import React from "react";
import { useState, useRef, useEffect, HTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { ButtonSubmit } from "@/components/button";
import { authStore } from "@/stores/authStore";
import { htmlContainerStore } from "@/stores/htmlContainerStore";
import { Pencil, Save } from 'lucide-react';
import { toast } from "sonner";

interface ControlledEditableProps extends HTMLAttributes<HTMLDivElement> {
  isEditable: boolean;
  content: string;
  identifier: string;
  onContentChange?: (content: string) => void;
  className?: string;
}

function ControlledEditable({
  isEditable,
  content,
  identifier,
  onContentChange,
  className = '',
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

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      contentEditable={canEdit}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      className={className}
      {...props}
    />
  );
}

export default function AccessCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const { requestAccessCode, requestNewAccessCode, isAutheticated, checkAuthentication } = authStore();
  const {
    getAllContainers,
    getContainerContent,
    createContainer,
    updateContainer,
  } = htmlContainerStore();
  const router = useRouter();

  const defaultContent = {
    'access-code-title': 'Access Code',
    'access-code-label': 'Enter Access Code',
    'access-code-resend': 'Resend Access Code',
    'access-code-placeholder': '000000',
    'access-code-submit': 'Submit Access Code',
    'access-code-submitting': 'Submitting',
    'access-code-modal-title': 'Confirm Resend',
    'access-code-modal-text': 'Please type "confirm" to resend the access code.',
    'access-code-modal-confirm-label': 'confirm',
    'access-code-modal-placeholder': "Type 'confirm' here",
    'access-code-modal-cancel': 'Cancel',
    'access-code-modal-confirm': 'Confirm',
    'access-code-modal-resending': 'Resending...',
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkAuthentication();
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [checkAuthentication]);

  useEffect(() => {
    const initializeContainers = async () => {
      try {
        await getAllContainers(!isAutheticated);

        if (isAutheticated) {
          for (const [identifier, content] of Object.entries(
            defaultContent
          )) {
            const existingContent = getContainerContent(identifier);
            if (!existingContent) {
              try {
                await createContainer(identifier, content);
              } catch (error) {
                console.log(
                  'Container might already exist:',
                  identifier
                );
              }
            }
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing containers:', error);
        setIsInitialized(true);
      }
    };

    initializeContainers();
  }, [
    isAutheticated,
    getAllContainers,
    getContainerContent,
    createContainer,
  ]);

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
        toast.error('Failed to save content. Please try again.');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error saving content. Please try again.');
    }
  };

  const handleToggleEdit = () => {
    if (!isAutheticated) {
      toast.success('Please login with access code to enable edit mode.');
      return;
    }
    setIsEditable(!isEditable);
  };

  const handleResendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
    setConfirmText("");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setConfirmText("");
  };

  const handleConfirmResend = async () => {
    const confirmLabel = getContent('access-code-modal-confirm-label').toLowerCase();
    if (confirmText.toLowerCase() !== confirmLabel) {
      toast.error(`Please type '${confirmLabel}' to proceed`);
      return;
    }

    setIsResending(true);
    try {
      await requestNewAccessCode();
      setShowModal(false);
      setConfirmText("");
    } catch (error) {
      console.error("Error resending access code:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const accessCode = formData.get("accessCode") as string;
      console.log("Access Code Submitted:", accessCode);
      
      const success = await requestAccessCode(accessCode);
      
      if (success) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Unexpected error submitting access code:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAutheticated && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleToggleEdit}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            title={isEditable ? "Save changes" : "Edit content"}
          >
            {isEditable ? (
              <Save className="w-6 h-6 text-black hover:text-gray-600" />
            ) : (
              <Pencil className="w-6 h-6 text-black hover:text-gray-600" />
            )}
          </button>
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg p-6 sm:p-8 bg-white shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">
            <span>
              <ControlledEditable
                isEditable={isEditable}
                content={getContent('access-code-title')}
                identifier="access-code-title"
                onContentChange={(content) => handleContentChange('access-code-title', content)}
                className="text-2xl font-semibold text-center"
              />
            </span>
          </h1>

          <div className="flex flex-col gap-2 mb-6">
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="accessCode" className="text-sm font-medium">
                <span className="inline-block">
                  <ControlledEditable
                    isEditable={isEditable}
                    content={getContent('access-code-label')}
                    identifier="access-code-label"
                    onContentChange={(content) => handleContentChange('access-code-label', content)}
                    className="text-sm font-medium"
                  />
                </span>
              </label>

              <button
                onClick={handleResendClick}
                className="cursor-pointer font-semibold text-sm text-black hover:underline"
              >
                <span className="inline-block">
                  <ControlledEditable
                    isEditable={isEditable}
                    content={getContent('access-code-resend')}
                    identifier="access-code-resend"
                    onContentChange={(content) => handleContentChange('access-code-resend', content)}
                    className="font-semibold text-sm"
                  />
                </span>
              </button>
            </div>

            <input
              type="text"
              id="accessCode"
              name="accessCode"
              placeholder={getContent('access-code-placeholder')}
              maxLength={8}
              inputMode="numeric"
              disabled={isLoading}
              className="text-lg border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-center disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>

          <ButtonSubmit
            props={{
              submitted: isLoading,
              buttonType: "submit",
              className: "w-full cursor-pointer",
              btnText: getContent('access-code-submit'),
              btnLoadingText: getContent('access-code-submitting'),
            }}
          />
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-10 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              <span>
                <ControlledEditable
                  isEditable={isEditable}
                  content={getContent('access-code-modal-title')}
                  identifier="access-code-modal-title"
                  onContentChange={(content) => handleContentChange('access-code-modal-title', content)}
                  className="text-xl font-semibold"
                />
              </span>
            </h2>
            <p className="text-gray-600 mb-4">
              <ControlledEditable
                isEditable={isEditable}
                content={getContent('access-code-modal-text')}
                identifier="access-code-modal-text"
                onContentChange={(content) => handleContentChange('access-code-modal-text', content)}
                className="text-gray-600"
              />
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={getContent('access-code-modal-placeholder')}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black mb-4"
              disabled={isResending}
              onKeyDown={(e) => {
                const confirmLabel = getContent('access-code-modal-confirm-label').toLowerCase();
                if (e.key === "Enter" && confirmText.toLowerCase() === confirmLabel) {
                  handleConfirmResend();
                }
              }}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleModalClose}
                disabled={isResending}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="inline-block">
                  <ControlledEditable
                    isEditable={isEditable}
                    content={getContent('access-code-modal-cancel')}
                    identifier="access-code-modal-cancel"
                    onContentChange={(content) => handleContentChange('access-code-modal-cancel', content)}
                    className=""
                  />
                </span>
              </button>
              <button
                onClick={handleConfirmResend}
                disabled={isResending || confirmText.toLowerCase() !== getContent('access-code-modal-confirm-label').toLowerCase()}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="inline-block">
                  {isResending ? (
                    <ControlledEditable
                      isEditable={isEditable}
                      content={getContent('access-code-modal-resending')}
                      identifier="access-code-modal-resending"
                      onContentChange={(content) => handleContentChange('access-code-modal-resending', content)}
                      className=""
                    />
                  ) : (
                    <ControlledEditable
                      isEditable={isEditable}
                      content={getContent('access-code-modal-confirm')}
                      identifier="access-code-modal-confirm"
                      onContentChange={(content) => handleContentChange('access-code-modal-confirm', content)}
                      className=""
                    />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}