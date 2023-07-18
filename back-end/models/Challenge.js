import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
    },
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
    },
    startingSize: {
        type: Number,
    },
    weightPercentChange: {
        type: Number,
    },
    sizePercentChange: {
        type: Number,
    },
});

const weighInSchema = new mongoose.Schema({
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
    createDate: {
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

const weighInWeekSchema = new mongoose.Schema({
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
    },
    weighIns: [weighInSchema],
    weighInDate: {
        type: Date,
        default: Date.now,
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
    weighIns: [weighInWeekSchema],
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
    this._previousBuyIn = this.buyIn;
    return buyIn;
});

challengeSchema.path('participants').set(function (participants) {
    this._previousParticipants = this.participants;
    return participants;
});

challengeSchema.pre('save', function (next) {
    if (this.isModified('buyIn') || this.isModified('participants')) {
        if (
            this.isModified('buyIn') &&
            this._previousBuyIn &&
            this._previousParticipants &&
            this._previousParticipants.length !== this.participants.length
        ) {
            this.prizePool = this.buyIn * this.participants.length;
        } else if (this.isModified('buyIn')) {
            this.prizePool += (this.buyIn - this._previousBuyIn) * this.participants.length;
        } else {
            this.prizePool = this.buyIn * this.participants.length;
        }
    }
    next();
});

const WeighIn = mongoose.model('WeighIn', weighInSchema);
const WeighInWeek = mongoose.model('WeighInWeek', weighInWeekSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);
const Participant = mongoose.model('Participant', participantSchema);

export { WeighIn, Challenge, Participant, WeighInWeek };
