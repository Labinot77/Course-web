// "use client";

// import { Button } from "@/components/ui/button";
// import React, { useState, useEffect } from "react";
// import { GrAddCircle } from "react-icons/gr";
// import { MdOutlineModeEditOutline } from "react-icons/md";
// import { addDoc, collection, getDocs, serverTimestamp, doc, updateDoc } from "firebase/firestore";
// import { db } from "@/db/firebaseClient";
// import Link from "next/link";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";

// interface Course {
//   id: string;
// }

// const CourseEpisodesList = (params: Course) => {
//   const COURSE_ID = params.id;
//   const [episodes, setEpisodes] = useState<any[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [currentEpisode, setCurrentEpisode] = useState<any>(null);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");

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

//   const addEpisode = async () => {
//     const randomTitle = `Episode ${Math.floor(Math.random() * 1000)}`;
//     await addDoc(collection(db, "courses", COURSE_ID, "episodes"), {
//       title: randomTitle,
//       description: "This is a randomly generated episode",
//       createdAt: serverTimestamp(),
//     });

//     await fetchEpisodes(); // Refresh list after adding
//   };

//   const openEditDialog = (episode: any) => {
//     setCurrentEpisode(episode);
//     setNewTitle(episode.title);
//     setNewDescription(episode.description);
//     setIsDialogOpen(true);
//   };

//   const handleUpdateEpisode = async () => {
//     if (currentEpisode) {
//       const episodeRef = doc(db, "courses", COURSE_ID, "episodes", currentEpisode.id);
//       await updateDoc(episodeRef, {
//         title: newTitle,
//         description: newDescription,
//         updatedAt: serverTimestamp(),
//       });

//       setIsDialogOpen(false);
//       fetchEpisodes(); // Refresh the list after update
//     }
//   };

//   useEffect(() => {
//     fetchEpisodes();
//   }, []);

//   return (
//     <div className="w-72 bg-primary-foreground rounded-md h-max p-2 flex flex-col gap-2 overflow-y-auto">
//         {episodes.length === 0 ? (
//       <ul className="flex flex-col gap-2">
//           <p className="text-center text-muted-foreground">
//             Loading episodes...
//             </p>
//           </ul>
//             ) : (
//         episodes.map((ep) => (
//           <div key={ep.id}>
//           <Button
//             variant="ghost"
//             className="flex justify-between items-center p-2 rounded-md"
//             onClick={() => openEditDialog(ep)} // Open the dialog when clicked
//           >
//             <Link
//               href={`/courses/edit/${COURSE_ID}/episode/${ep.id}`}
//               className="flex items-center gap-2"
//             >
//               <p>{ep.title}</p>
//               <MdOutlineModeEditOutline />
//             </Link>
//           </Button>
//       <ul>
//         <li className="flex justify-center items-center p-2">
//           <Button variant="ghost" onClick={addEpisode}>
//             <GrAddCircle />
//           </Button>
//         </li>
//       </ul>
//           </div>
//         ))
//         )}

//       {/* Edit Episode Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>Edit Episode</DialogHeader>
//             <div className="flex flex-col gap-4">
//               <Input
//                 value={newTitle}
//                 onChange={(e) => setNewTitle(e.target.value)}
//                 placeholder="Episode Title"
//               />
//               <Input
//                 value={newDescription}
//                 onChange={(e) => setNewDescription(e.target.value)}
//                 placeholder="Episode Description"
//               />
//             </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateEpisode}>Save Changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CourseEpisodesList;
