import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    buyInStatus: {
        type: Boolean,
        default: false,
    },
    startingWeight: {
        type: Number,
        select: false,
    },
    startingSize: {
        type: Number,
        select: false,
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
    createdDate: {
        type: Date,
        default: Date.now,
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

challengeSchema.virtual('prizePool').get(function () {
    if (this.buyIn && this.participants) {
        return this.buyIn * this.participants.length;
    }
    return 0;
});

challengeSchema.path('buyIn').set(function (buyIn) {
    this._previousBuyIn = this.buyIn; // Store the previous value of buyIn
    return buyIn;
});

challengeSchema.path('participants').set(function (participants) {
    this._previousParticipants = this.participants; // Store the previous value of participants
    return participants;
});

challengeSchema.pre('save', function (next) {
    if (this.isModified('buyIn') || this.isModified('participants')) {
        // Check if buyIn or participants field has been modified
        if (
            this.isModified('buyIn') &&
            this._previousBuyIn &&
            this._previousParticipants &&
            this._previousParticipants.length !== this.participants.length
        ) {
            // Check if both buyIn and participants have changed
            this.prizePool = this.buyIn * this.participants.length;
        } else if (this.isModified('buyIn')) {
            // Only buyIn field has changed
            this.prizePool +=
                (this.buyIn - this._previousBuyIn) * this.participants.length;
        } else {
            // Only participants field has changed
            this.prizePool = this.buyIn * this.participants.length;
        }
    }
    next();
});

const WeighIn = mongoose.model('WeighIn', weighInSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Participant = mongoose.model('Participant', participantSchema);

export { WeighIn, Challenge, Participant };