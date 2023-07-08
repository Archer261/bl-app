import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    buyInStatus: {
        type: Boolean,
        default: false,
    },
    startingWeight: {
        type: Number,
    },
    startingSize: {
        type: Number,
    },
});

const weighInSchema = new mongoose.Schema({
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    beginningWeight: {
        type: Number,

    },
    currentWeight: {
        type: Number,
        required: true,
    },
    weighInDate: {
        type: Date,
        default: Date.now,
    },
    beginningSize: {
        type: Number,

    },
    currentSize: {
        type: Number,
    },
});

const challengeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    participants: [participantSchema],
    count: { type: Number, default: 0 },
    withSize: {
        type: Boolean,
        required: true,
    },
    buyIn: {
        type: Number,
    },
    weighIns: [weighInSchema],
    isFeatured: {
        type: Boolean,
        default: false,
    },
});

challengeSchema.virtual('weekCount').get(function () {
    const weeks = Math.ceil((this.endDate - this.startDate) / (7 * 24 * 60 * 60 * 1000));
    return weeks;
});

challengeSchema.pre('save', function (next) {
    this.count = this.weekCount;
    next();
});

challengeSchema.set('toJSON', { virtuals: true });

const WeighIn = mongoose.model('WeighIn', weighInSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Participant = mongoose.model('Participant', participantSchema);

export { WeighIn, Challenge, Participant };