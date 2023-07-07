import mongoose from 'mongoose';

const weighInSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    weighInDate: {
        type: Date,
        default: Date.now,
    },

    size: {
        type: Number,

    },
});

const challengeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    participants: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        buyInStatus: { type: Boolean, default: false }
    }],
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
    }

});

challengeSchema.virtual('weekCount').get(function () {
    const weeks = Math.ceil(
        (this.endDate - this.startDate) / (7 * 24 * 60 * 60 * 1000)
    );
    return weeks;
});

challengeSchema.pre('save', function (next) {
    this.count = this.weekCount;
    next();
});

challengeSchema.set('toJSON', { virtuals: true });

const WeighIn = mongoose.model('WeighIn', weighInSchema);
const Challenge = mongoose.model('Challenge', challengeSchema);

export { WeighIn, Challenge };