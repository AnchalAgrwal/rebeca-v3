const Event = require("../models/eventModel");
const Round = require("../models/roundModel")
const catchAsync = require("../utils/catchAsync");
const uploadToCloudinary = require("../utils/cloudinary").uploadToCloudinary;
const deleteFromCloudinary = require("../utils/cloudinary").deleteFromCloudinary;

exports.createEvent = catchAsync(async (req, res, next) => {
    console.log("Create event request")
    try {
        console.log("Request body:", req.body);
        const alreadyExists = await Event.findOne({ name: req.body.name });
        if (alreadyExists)
            return res.status(400).json({ message: "An Event With this Name Already Exists", data: alreadyExists });
        // add poster and thumbnail to cloudinary and get the urls
        if (req.files) {
            if (req.files.poster) {
                const poster = await uploadToCloudinary(req.files.poster, "event_posters");
                req.body.poster = poster;
            }
            if (req.files.thumbnail) {
                const thumbnail = await uploadToCloudinary(req.files.thumbnail, "event_thumbnails");
                req.body.thumbnail = thumbnail;
            }
        }
        const eventData = new Event({
            ...req.body,
            rounds: req.body.rounds?JSON.parse(req.body.rounds) : [],
            coords: req.body.coords ? JSON.parse(req.body.coords) : [],
        });
        await eventData.save();
        return res.status(201).json({ message: "success", data: eventData });
    } catch (err) {
        console.log("Error while adding event ||" + ` message: ${err.message}`);
        next(err);
    }
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
    console.log("Delete events request")
    try {
        const id = req.query._id;
        console.log("Event ID to delete:", id);
        const deletedEvent = await Event.findByIdAndDelete(id);
        console.log("Deleted event:", deletedEvent);

        // delete poster and thumbnail from cloudinary
        if (deletedEvent.poster) {
            await deleteFromCloudinary(deletedEvent.poster.split('/').pop().split('.')[0]);
            console.log("Deleted poster from Cloudinary:", deletedEvent.poster);
        }
        if (deletedEvent.thumbnail) {
            await deleteFromCloudinary(deletedEvent.thumbnail.split('/').pop().split('.')[0]);
            console.log("Deleted thumbnail from Cloudinary:", deletedEvent.thumbnail);
        }

        
        if (!deletedEvent) {
            return res.status(404).json({ message: "Error while performing event deletion" });
        } else {
            return res.status(200).json({ message: "success", data: deletedEvent });
        }
    } catch (err) {
        console.log("Error while deleting event ||" + ` message: ${err.message}`);
        next(err);
    }
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
    console.log("Event fetch request")
    try {
        const email = req.query.email;
        const allEvents = await Event.find()
            .populate("coords")
            .populate("rounds")

        if (email === "null" || (!email)) {
            return res.status(200).json({ message: "success", data: allEvents });
        } else {
            const filteredEvents = allEvents.filter((event) =>
                event.coords.some((coordinator) => coordinator.email === email)
            );
            return res.status(200).json({ message: "success", data: filteredEvents });
        }
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.updateEvent = catchAsync(async (req, res, next) => {
    try {
        console.log("Event updation request:", req.body);
        const updated = { ...req.body };
        if (updated.rounds && updated.rounds.length > 0) updated.rounds = JSON.parse(updated.rounds);

        // add poster and thumbnail to cloudinary and get the urls
        if (req.files) {
            console.log("Files received for update:", req.files);
            if (req.files.poster) {
                const poster = await uploadToCloudinary(req.files.poster[0].buffer, "event_posters");
                updated.poster = poster;
            }
            if (req.files.thumbnail) {
                const thumbnail = await uploadToCloudinary(req.files.thumbnail[0].buffer, "event_thumbnails");
                updated.thumbnail = thumbnail;
            }
        }
        console.log("Updated event data after processing files:", updated.poster, updated.thumbnail);

        const oldEvent = await Event.findByIdAndUpdate(
            req.body._id,
            { ...updated },
            { new: false, runValidators: true }
        );

        console.log(oldEvent);

        if (!oldEvent) {
            return res.status(404).json({ message: "Event to be updated not found" });
        }
        if (oldEvent.poster) {
            await deleteFromCloudinary(oldEvent.poster.split('/').pop().split('.')[0]);
            console.log("Deleted poster from Cloudinary:", oldEvent.poster);
        }
        if (oldEvent.thumbnail) {
            await deleteFromCloudinary(oldEvent.thumbnail.split('/').pop().split('.')[0]);
            console.log("Deleted thumbnail from Cloudinary:", oldEvent.thumbnail);
        }

        return res.status(200).json({ message: "success", data: { ...updated, _id: req.body._id } });
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

exports.createRound = catchAsync(async (req, res, next) => {
    console.log("Round Addition request raised");

    try {
        // get the event details
        const evnt = await Event.findById(req.body.eventId)
        if (!evnt) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (evnt.rounds.some(r => r.no == req.body.no)) {
            return res.status(400).json({message: "This Round already exists"})
        }
        const round = new Round({...req.body});
        await round.save();

        //add it to event's roundlist
        const upd = await Event.findByIdAndUpdate(evnt._id, {$push: {rounds: round._id}}, {new: true})
        return res.status(200).json({message: "Round added successfully and linked to event"})



    } catch (err) {
        console.log(err.message);
        next(err)
    }
})