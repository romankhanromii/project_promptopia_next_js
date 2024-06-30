// "use client";

// import Form from "@components/Form";
// import { useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { useEffect, useState } from "react";

// const EditPrompt = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [submitting, setSubmitting] = useState(false);
//   const searchParams = useSearchParams();
//   const promptId = searchParams.get("id");
//   const [post, setPost] = useState({
//     prompt: "",
//     tag: "",
//   });
//   useEffect(() => {
//     const getPromptDetial = async () => {
//       const response = await fetch(`/api/prompt/${promptId}`);

//       const data = await response.json();

//       setPost({
//         prompt: data.prompt,
//         tag: data.tag,
//       });
//     };
//     if (promptId) getPromptDetial();
//   }, [promptId]);

//   const updatePrompt = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     if (!promptId) return alert("Prompt Id not found");
//     try {
//       const response = await fetch(`/api/prompt/${promptId}`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           prompt: post.prompt,

//           tag: post.tag,
//         }),
//       });
//       if (response.ok) {
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Form
//         type="Edit"
//         post={post}
//         setPost={setPost}
//         submitting={submitting}
//         handleSubmit={updatePrompt}
//       />
//     </>
//   );
// };

// export default EditPrompt;
"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetail = async () => {
      const params = new URLSearchParams(window.location.search);
      const promptId = params.get("id");

      if (promptId) {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };

    getPromptDetail();
  }, []); // Empty dependency array ensures this effect runs only once

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!post.promptId) return alert("Prompt Id not found");

    try {
      const response = await fetch(`/api/prompt/${post.promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default EditPrompt;
