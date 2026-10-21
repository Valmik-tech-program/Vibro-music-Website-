// import musicModel from "../models/music.model.js";
// import { uploadFile } from "../service/cloudinary.js";

// export const addSong =async (req, res) => {
//     const {songname} = req.body
//     const url = req.files.url[0]
//     const songbanner = req.files.songbanner[0]

//     if(!songname || !url){
//         return res.status(400).json({
//             message : "all fields are required"
//         })
//     }
//     const result = await uploadFile(url.buffer) //req.file.buffer
//     const baneeresult = await uploadFile(songbanner.buffer) 
//     console.log(result)
//     console.log(baneeresult)
//     const song = await musicModel.create({
//         songname ,
//         url : result.secure_url,
//         songbanner : baneeresult.secure_url
//     })

//     res.status(201).json({
//         message : "music added successfully",
//         song
//     })

//     console.log(result)

// }


// export const getAllSongs = async(req, res) => {
//     const songs = await musicModel.find()
//     res.status(201).json({
//         message : "songs",
//         songs
//     })

// }


// export const getDeleteSong = async(req,res) =>{
//     const {id} = req.params
    
//     const song = await musicModel.findByIdAndDelete(id)
//     if(!song){
//         return res.status(400).json({
//             message:"song not found"
//     })
//     }
//     res.status(201).json({
//         message:"song deleted sussusefully"
//     })
// }

// export const getsong =async(req,res) => {
//      const{id} = req.params

//      const song = await musicModel.findById(id)
//      if(!song){
//         return res.status(400).json({
//             message:"song not found"
//     })
//     }
//     res.status(201).json({
//         message:"song get sussesfully",
//         song
//     })
// }

// export const updateSong = async(req,res) => {
//     const {id} = req.params
//     const {songname} = req.body

//     const song = await musicModel.findByIdAndUpdate(
//         id,{songname},
//         {new:true}

//     )

//     if (!song){
//         return res.status(400).json({
//             message:"Song not found"
//         })
//     }

//      res.status(400).json({
//             message:"Song updated sussesfully"

//      })
// }




import musicModel from "../models/music.model.js";
import { uploadFile } from "../service/cloudinary.js";

// 🎵 ADD SONG
export const addSong = async (req, res) => {
  const {
    songname,
    artist,
    album,
    genre,
    duration,
    releaseDate,
    description
  } = req.body;

  const url = req.files.url?.[0];
  const songbanner = req.files.songbanner?.[0];

  if (!songname || !url || !songbanner) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  const result = await uploadFile(url.buffer);
  const bannerResult = await uploadFile(songbanner.buffer);

  const song = await musicModel.create({
    songname,
    url: result.secure_url,
    songbanner: bannerResult.secure_url,

    artist,
    uploadedBy: req.user.id,
    album,
    genre,
    duration,
    releaseDate,
    description
  });

  res.status(201).json({
    message: "Music added successfully",
    song,
  });
};


// 🎵 GET ALL SONGS
export const getAllSongs = async (req, res) => {
  const songs = await musicModel.find();

  res.status(200).json({
    message: "songs",
    songs,
  });
};

export const getSongsByLanguage = async (req, res) => {
  const songs = await musicModel.find({
    genre: { $regex: `^${req.params.language}$`, $options: "i" },
  });

  res.status(200).json({
    message: "songs",
    songs,
  });
};


// 🎵 GET SINGLE SONG
export const getsong = async (req, res) => {
  const { id } = req.params;

  const song = await musicModel.findById(id);

  if (!song) {
    return res.status(404).json({
      message: "Song not found",
    });
  }

  res.status(200).json({
    message: "Song fetched successfully",
    song,
  });
};


// 🎵 DELETE SONG
export const getDeleteSong = async (req, res) => {
  const { id } = req.params;

  const song = await musicModel.findOneAndDelete({
    _id: id,
    uploadedBy: req.user.id,
  });

  if (!song) {
    return res.status(404).json({
      message: "Song not found",
    });
  }

  res.status(200).json({
    message: "Song deleted successfully",
  });
};


// 🎵 UPDATE SONG
export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await musicModel.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // ✅ Update only fields that are sent
    song.songname = req.body.songname || song.songname;
    song.artist = req.body.artist || song.artist;
    song.album = req.body.album || song.album;
    song.genre = req.body.genre || song.genre;
    song.duration = req.body.duration || song.duration;
    song.releaseDate = req.body.releaseDate || song.releaseDate;
    song.description = req.body.description || song.description;

    // ✅ File updates (optional)
    if (req.files?.url) {
      song.url = req.files.url[0].path;
    }

    if (req.files?.songbanner) {
      song.songbanner = req.files.songbanner[0].path;
    }

    await song.save();

    res.json({ message: "Song updated successfully", song });


  


  } catch (error) {
    res.status(500).json({ error: error.message });
  }



  
};


export const searchSongs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json([]);
    }

    const songs = await Music.find({
      songname: {
        $regex: q.trim(),
        $options: "i",
      },
    })
      .limit(10)
      .select("songname songbanner artist");

    res.status(200).json(songs);

  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      message: "Failed to search songs",
    });
  }
};