// "use client";

// import { Button } from "@/components/ui/button";
// import React, { useState, useEffect } from "react";
// import { MdOutlineModeEditOutline } from "react-icons/md";
// import { addDoc, collection, getDocs, serverTimestamp, doc, updateDoc } from "firebase/firestore";
// import { db } from "@/db/firebaseClient";
// import Link from "next/link";

// interface Course {
//   id: string;
// }

// const CourseEpisodesListPublic = (params: Course) => {
//   const COURSE_ID = params.id;

//   const [episodes, setEpisodes] = useState<any[]>([]);

//   const fetchEpisodes = async () => {
//     const snapshot = await getDocs(
//       collection(db, "courses", COURSE_ID, "episodes")
//     );
//     const episodesData = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setEpisodes(episodesData);
//   };

//   useEffect(() => {
//     fetchEpisodes();
//   }, []);

//   console.log(episodes);
//   return (
//     <div className="w-72 bg-primary-foreground rounded-md h-max p-2 flex flex-col gap-2 overflow-y-auto">
//       <ul className="flex flex-col gap-2">
//         {episodes.length === 0 ? (
//           <p className="text-center text-muted-foreground">
//             Loading episodes...
//           </p>
//           ): (
//             episodes.map((ep) => (
//               <Button
//                 variant="ghost"
//                 key={ep.id}
//                 className="flex justify-between items-center p-2 rounded-md"
//               >
//                 <Link
//                   href={`/courses/${COURSE_ID}/episode/${ep.id}`}
//                   className="flex items-center gap-2"
//                 >
//                   <p>{ep.title}</p>
//                   <MdOutlineModeEditOutline />
//                 </Link>
//               </Button>
//             ))
//           )}
//       </ul>
//     </div>
//   );
// };

// export default CourseEpisodesListPublic;
