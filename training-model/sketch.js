// load data
const trainData = requrie("../data/train-data.json");
const validationData = requrie("../data/validation-data.json");

// returns tensor from data
function dataToTensor(data) {
    let inputData = [];

    for (let i = 0; i < data.feature.length; i++) {
        inputData.push({
            x: data.feature[i],
            y: data.label[i],
        });
    }

    return tf.tidy(() => {
        // shuffle data
        tf.util.shuffle(inputData);

        // convert data to tensors
        const features = inputData.map((d) => d.x);
        const labels = inputData.map((d) => d.y);
        const featureTensor = tf.tensor2d(features);
        const labelTensor = tf.tensor1d(labels);

        return {
            inputs: featureTensor,
            labels: labelTensor,
        };
    });
}

// create model
function getModel() {
    const model = tf.sequential();

    model.add(
        tf.layers.dense({
            inputShape: [34],
            units: 16,
            activation: "relu",
        })
    );

    model.add(
        tf.layers.dense({
            units: 16,
            activation: "relu",
        })
    );

    model.add(
        tf.layers.dense({
            units: 1,
            activation: "sigmoid",
        })
    );

    const optimizer = tf.train.sgd(0.01);
    model.compile({
        loss: "binaryCrossentropy",
        optimizer: optimizer,
        metrics: ["accuracy"],
    });

    return model;
}

// train model
async function trainModel(model, trainData, validationData) {
    const metrics = ["loss", "val_loss", "acc", "val_acc"];
    const container = {
        name: "Model Training",
        tab: "Model",
        styles: { height: "1000px" },
    };
    const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
    const BATCH_SIZE = 64;

    return model.fit(trainData.inputs, trainData.labels, {
        batchSize: BATCH_SIZE,
        validationData: [validationData.inputs, validationData.labels],
        epochs: 10,
        shuffle: true,
        callbacks: fitCallbacks,
    });
}

// main thread
async function run() {
    // load model
    const model = getModel();
    tfvis.show.modelSummary(
        { name: "Model Architecture", tab: "Model" },
        model
    );

    // load data
    const trainDataInput = dataToTensor(trainData);
    const validationDataInput = dataToTensor(validationData);

    // train model
    await trainModel(model, trainDataInput, validationDataInput);
}
