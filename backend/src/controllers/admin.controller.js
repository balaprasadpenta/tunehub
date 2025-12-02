import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: auto,
    });
    return result.secure_url;
  } catch (error) {
    console.log("error in upoading to cloudinary", error);
    throw new Error("error in uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "please upload the required files " });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      duration,
      audioUrl,
      imageUrl,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json("song created successfully", song);
  } catch (error) {
    console.log("error in createSong controller", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    // fetch the song and delete
    const { id } = req.params;

    const songToBeDeleted = await Song.findById(id);

    // update the album by removing the song
    if (songToBeDeleted.albumId) {
      await Album.findByIdAndUpdate(songToBeDeleted.albumId, {
        $pull: { songs: songToBeDeleted._id },
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json("song deleted successfully", songToBeDeleted);
  } catch (error) {
    console.log("error in delete song controller the song", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile) {
      res.status(400).json({ message: "please upload the required files" });
    }
    // get inputs from User
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;

    const imageUrl = await uploadToCloudinary(imageFile);

    // create album
    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });

    await album.save();

    res.status(201).json({ message: "album created sucessfully", album });
  } catch (error) {
    console.log("error in creating album ", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "album is deleted successfully" });
  } catch (error) {
    console.log("error in deleting the album", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
