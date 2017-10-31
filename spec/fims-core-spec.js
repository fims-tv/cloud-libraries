describe("The library", () => {

    var core;

    beforeEach(() => {
        core = require("../lib/fims-core")
    })

    it("has a default context url", () => {
        expect(core.getDefaultContextURL()).toBeDefined();
    });

    it("has a default context", () => {
        expect(core.getDefaultContext()).toBeDefined();
    });

    it("allows creating a Job Profile", (callback) => {
        var jobProfile = new core.JobProfile(
            "ExtractThumbnail",
            [
                new core.JobParameter("fims:inputFile", "fims:Locator"),
                new core.JobParameter("fims:outputLocation", "fims:Locator")
            ],
            [
                new core.JobParameter("fims:outputFile", "fims:Locator")
            ],
            [
                new core.JobParameter("ebucore:width"),
                new core.JobParameter("ebucore:height")
            ]
        );

        core.compact(jobProfile, {}, (err, output) => {
            expect(err).toBeNull();

            expect(output["@type"]).toBe("http://fims.tv#JobProfile");
            expect(output["http://www.w3.org/2000/01/rdf-schema#label"]).toBe("ExtractThumbnail");

            expect(output["http://fims.tv#hasInputParameter"]).toBeDefined();
            expect(output["http://fims.tv#hasInputParameter"].length).toBe(2);
            expect(output["http://fims.tv#hasInputParameter"][0]).toBeDefined();
            expect(output["http://fims.tv#hasInputParameter"][0]["@type"]).toBe("http://fims.tv#JobParameter");
            expect(output["http://fims.tv#hasInputParameter"][0]["http://fims.tv#jobParameterType"]).toBeDefined();
            expect(output["http://fims.tv#hasInputParameter"][0]["http://fims.tv#jobParameterType"]["@id"]).toBe("http://fims.tv#Locator");
            expect(output["http://fims.tv#hasInputParameter"][0]["http://fims.tv#jobProperty"]).toBeDefined();
            expect(output["http://fims.tv#hasInputParameter"][0]["http://fims.tv#jobProperty"]["@id"]).toBe("http://fims.tv#inputFile");
            expect(output["http://fims.tv#hasInputParameter"][1]).toBeDefined();
            expect(output["http://fims.tv#hasInputParameter"][1]["@type"]).toBe("http://fims.tv#JobParameter");
            expect(output["http://fims.tv#hasInputParameter"][1]["http://fims.tv#jobParameterType"]).toBeDefined();
            expect(output["http://fims.tv#hasInputParameter"][1]["http://fims.tv#jobParameterType"]["@id"]).toBe("http://fims.tv#Locator");
            expect(output["http://fims.tv#hasInputParameter"][1]["http://fims.tv#jobProperty"]).toBeDefined();
            expect(output["http://fims.tv#hasInputParameter"][1]["http://fims.tv#jobProperty"]["@id"]).toBe("http://fims.tv#outputLocation");

            expect(output["http://fims.tv#hasOptionalInputParameter"]).toBeDefined();
            expect(output["http://fims.tv#hasOptionalInputParameter"].length).toBe(2);
            expect(output["http://fims.tv#hasOptionalInputParameter"][0]).toBeDefined();
            expect(output["http://fims.tv#hasOptionalInputParameter"][0]["@type"]).toBe("http://fims.tv#JobParameter");
            expect(output["http://fims.tv#hasOptionalInputParameter"][0]["http://fims.tv#jobProperty"]).toBeDefined();
            expect(output["http://fims.tv#hasOptionalInputParameter"][0]["http://fims.tv#jobProperty"]["@id"]).toBe("http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#width");
            expect(output["http://fims.tv#hasOptionalInputParameter"][1]).toBeDefined();
            expect(output["http://fims.tv#hasOptionalInputParameter"][1]["@type"]).toBe("http://fims.tv#JobParameter");
            expect(output["http://fims.tv#hasOptionalInputParameter"][1]["http://fims.tv#jobProperty"]).toBeDefined();
            expect(output["http://fims.tv#hasOptionalInputParameter"][1]["http://fims.tv#jobProperty"]["@id"]).toBe("http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#height");

            expect(output["http://fims.tv#hasOutputParameter"]).toBeDefined();
            expect(output["http://fims.tv#hasOutputParameter"]["@type"]).toBe("http://fims.tv#JobParameter");
            expect(output["http://fims.tv#hasOutputParameter"]["http://fims.tv#jobParameterType"]).toBeDefined();
            expect(output["http://fims.tv#hasOutputParameter"]["http://fims.tv#jobParameterType"]["@id"]).toBe("http://fims.tv#Locator");
            expect(output["http://fims.tv#hasOutputParameter"]["http://fims.tv#jobProperty"]).toBeDefined();
            expect(output["http://fims.tv#hasOutputParameter"]["http://fims.tv#jobProperty"]["@id"]).toBe("http://fims.tv#outputFile");

            callback(err);
        });
    });

    it("allows creating a Service", (callback) => {
        var service = new core.Service(
            "FFmpeg TransformService",
            [
                new core.ServiceResource("fims:JobAssignment", "http://transformServiceUrl/JobAssignment")
            ],
            "fims:TransformJob",
            [
                "http://urlToExtractThumbnailJobProfile/",
                "http://urlToCreateProxyJobProfile/"
            ],
            [
                new core.Locator({
                    "awsS3Bucket": "private-repo.fims.tv"
                })
            ],
            [
                new core.Locator({
                    "awsS3Bucket": "private-repo.fims.tv"
                })
            ]
        );

        core.compact(service, {}, (err, output) => {
            expect(err).toBeNull();

            expect(output["@type"]).toBe("http://fims.tv#Service");
            expect(output["http://www.w3.org/2000/01/rdf-schema#label"]).toBe("FFmpeg TransformService");

            expect(output["http://fims.tv#hasServiceResource"]).toBeDefined();
            expect(output["http://fims.tv#hasServiceResource"]["@type"]).toBe("http://fims.tv#ServiceResource");
            expect(output["http://fims.tv#hasServiceResource"]["http://fims.tv#resourceType"]).toBeDefined();
            expect(output["http://fims.tv#hasServiceResource"]["http://fims.tv#resourceType"]["@id"]).toBe("http://fims.tv#JobAssignment");
            expect(output["http://fims.tv#hasServiceResource"]["http://fims.tv#httpEndpoint"]).toBeDefined();
            expect(output["http://fims.tv#hasServiceResource"]["http://fims.tv#httpEndpoint"]["@type"]).toBe("http://www.w3.org/2001/XMLSchema#anyURI");
            expect(output["http://fims.tv#hasServiceResource"]["http://fims.tv#httpEndpoint"]["@value"]).toBe("http://transformServiceUrl/JobAssignment");

            expect(output["http://fims.tv#acceptsJobProfile"]).toBeDefined();
            expect(output["http://fims.tv#acceptsJobProfile"].length).toBe(2);
            expect(output["http://fims.tv#acceptsJobProfile"][0]).toBeDefined();
            expect(output["http://fims.tv#acceptsJobProfile"][0]["@id"]).toBe("http://urlToExtractThumbnailJobProfile/");
            expect(output["http://fims.tv#acceptsJobProfile"][1]).toBeDefined();
            expect(output["http://fims.tv#acceptsJobProfile"][1]["@id"]).toBe("http://urlToCreateProxyJobProfile/");

            expect(output["http://fims.tv#acceptsJobType"]).toBeDefined();
            expect(output["http://fims.tv#acceptsJobType"]["@id"]).toBe("http://fims.tv#TransformJob");

            expect(output["http://fims.tv#hasJobInputLocation"]).toBeDefined();
            expect(output["http://fims.tv#hasJobInputLocation"]["@type"]).toBe("http://fims.tv#Locator");
            expect(output["http://fims.tv#hasJobInputLocation"]["http://fims.tv#amazonWebServicesS3Bucket"]).toBe("private-repo.fims.tv");

            expect(output["http://fims.tv#hasJobOutputLocation"]).toBeDefined();
            expect(output["http://fims.tv#hasJobOutputLocation"]["@type"]).toBe("http://fims.tv#Locator");
            expect(output["http://fims.tv#hasJobOutputLocation"]["http://fims.tv#amazonWebServicesS3Bucket"]).toBe("private-repo.fims.tv");

            callback(err);
        });
    });

    it("allows creating a Transform Job", (callback) => {
        var transformJob = new core.TransformJob(
            "http://urlToExtractThumbnailJobProfile/",
            new core.JobParameterBag({
                "fims:inputFile": {
                    type: "fims:Locator",
                    awsS3Bucket: "private-repo.fims.tv",
                    awsS3Key: "media-file.mp4"
                },
                "fims:outputLocation": {
                    type: "fims:Locator",
                    awsS3Bucket: "private-repo.fims.tv",
                    awsS3Key: "thumbnails/"
                }
            }),
            new core.AsyncEndpoint("http://urlForJobSuccess", "http://urlForJobFailed")
        );

        core.compact(transformJob, {}, (err, output) => {
            expect(err).toBeNull();

            expect(output["@type"]).toBe("http://fims.tv#TransformJob");

            expect(output["http://fims.tv#hasJobProfile"]).toBeDefined();
            expect(output["http://fims.tv#hasJobProfile"]["@id"]).toBe("http://urlToExtractThumbnailJobProfile/");

            expect(output["http://fims.tv#hasJobInput"]).toBeDefined();
            expect(output["http://fims.tv#hasJobInput"]["@type"]).toBe("http://fims.tv#JobParameterBag");
            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#inputFile"]).toBeDefined();
            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#inputFile"]["@type"]).toBe("http://fims.tv#Locator");
            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#inputFile"]["http://fims.tv#amazonWebServicesS3Bucket"]).toBe("private-repo.fims.tv");
            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#inputFile"]["http://fims.tv#amazonWebServicesS3Key"]).toBe("media-file.mp4");

            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#outputLocation"]).toBeDefined();
            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#outputLocation"]["@type"]).toBe("http://fims.tv#Locator");
            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#outputLocation"]["http://fims.tv#amazonWebServicesS3Bucket"]).toBe("private-repo.fims.tv");
            expect(output["http://fims.tv#hasJobInput"]["http://fims.tv#outputLocation"]["http://fims.tv#amazonWebServicesS3Key"]).toBe("thumbnails/");

            expect(output["http://fims.tv#hasJobStatus"]).toBeDefined();
            expect(output["http://fims.tv#hasJobStatus"]["@type"]).toBe("http://fims.tv#JobStatus");
            expect(output["http://fims.tv#hasJobStatus"]["@value"]).toBe("New");

            expect(output["http://fims.tv#hasAsyncEndpoint"]).toBeDefined();
            expect(output["http://fims.tv#hasAsyncEndpoint"]["@type"]).toBe("http://fims.tv#AsyncEndpoint");
            expect(output["http://fims.tv#hasAsyncEndpoint"]["http://fims.tv#asyncEndpointFailure"]).toBeDefined();
            expect(output["http://fims.tv#hasAsyncEndpoint"]["http://fims.tv#asyncEndpointFailure"]["@type"]).toBe("http://www.w3.org/2001/XMLSchema#anyURI");
            expect(output["http://fims.tv#hasAsyncEndpoint"]["http://fims.tv#asyncEndpointFailure"]["@value"]).toBe("http://urlForJobFailed");
            expect(output["http://fims.tv#hasAsyncEndpoint"]["http://fims.tv#asyncEndpointSuccess"]).toBeDefined();
            expect(output["http://fims.tv#hasAsyncEndpoint"]["http://fims.tv#asyncEndpointSuccess"]["@type"]).toBe("http://www.w3.org/2001/XMLSchema#anyURI");
            expect(output["http://fims.tv#hasAsyncEndpoint"]["http://fims.tv#asyncEndpointSuccess"]["@value"]).toBe("http://urlForJobSuccess");

            callback(err);
        });
    });

    it("allows creating a Job Process", (callback) => {
        var jobProcess = new core.JobProcess("http://urlToTransformJob");

        core.compact(jobProcess, {}, (err, output) => {
            expect(err).toBeNull();

            expect(output["@type"]).toBe("http://fims.tv#JobProcess");

            expect(output["http://fims.tv#hasJob"]).toBeDefined();
            expect(output["http://fims.tv#hasJob"]["@id"]).toBe("http://urlToTransformJob");

            expect(output["http://fims.tv#hasJobProcessStatus"]).toBeDefined();
            expect(output["http://fims.tv#hasJobProcessStatus"]["@type"]).toBe("http://fims.tv#JobProcessStatus");
            expect(output["http://fims.tv#hasJobProcessStatus"]["@value"]).toBe("New");

            callback(err);
        });
    });

    it("allows creating a Job Assignment", (callback) => {
        var jobAssignment = new core.JobAssignment("http://urlToJobProcess");

        core.compact(jobAssignment, {}, (err, output) => {
            expect(err).toBeNull();

            expect(output["@type"]).toBe("http://fims.tv#JobAssignment");

            expect(output["http://fims.tv#hasJobProcess"]).toBeDefined();
            expect(output["http://fims.tv#hasJobProcess"]["@id"]).toBe("http://urlToJobProcess");

            expect(output["http://fims.tv#hasJobProcessStatus"]).toBeDefined();
            expect(output["http://fims.tv#hasJobProcessStatus"]["@type"]).toBe("http://fims.tv#JobProcessStatus");
            expect(output["http://fims.tv#hasJobProcessStatus"]["@value"]).toBe("New");

            callback(err);
        });
    });

    it("allows validation of a Job", (callback) => {
        var transformJob = new core.TransformJob(
            new core.JobProfile(
                "ExtractThumbnail",
                [
                    new core.JobParameter("fims:inputFile", "fims:Locator"),
                    new core.JobParameter("fims:outputLocation", "fims:Locator")
                ],
                [
                    new core.JobParameter("fims:outputFile", "fims:Locator")
                ],
                [
                    new core.JobParameter("ebucore:width"),
                    new core.JobParameter("ebucore:height")
                ]
            ),
            new core.JobParameterBag({
                "fims:inputFile": {
                    type: "fims:Locator",
                    awsS3Bucket: "private-repo.fims.tv",
                    awsS3Key: "media-file.mp4"
                },
                "fims:outputLocation": {
                    type: "fims:Locator",
                    awsS3Bucket: "private-repo.fims.tv",
                    awsS3Key: "thumbnails/"
                }
            }),
            new core.AsyncEndpoint("http://urlForJobSuccess", "http://urlForJobFailed")
        );

        core.isValidJob(transformJob, (err) => {
            expect(err).toBeNull();

            callback(err);
        });
    });

    it("can determine if service can accept a Job", (callback) => {
        var service = new core.Service(
            "FFmpeg TransformService",
            [
                new core.ServiceResource("fims:JobAssignment", "http://transformServiceUrl/JobAssignment")
            ],
            "fims:TransformJob",
            [
                new core.JobProfile(
                    "ExtractThumbnail",
                    [
                        new core.JobParameter("fims:inputFile", "fims:Locator"),
                        new core.JobParameter("fims:outputLocation", "fims:Locator")
                    ],
                    [
                        new core.JobParameter("fims:outputFile", "fims:Locator")
                    ],
                    [
                        new core.JobParameter("ebucore:width"),
                        new core.JobParameter("ebucore:height")
                    ]
                )
            ],
            [
                new core.Locator({
                    "awsS3Bucket": "private-repo.fims.tv"
                })
            ],
            [
                new core.Locator({
                    "awsS3Bucket": "private-repo.fims.tv"
                })
            ]
        );

        var transformJob = new core.TransformJob(
            new core.JobProfile(
                "ExtractThumbnail",
                [
                    new core.JobParameter("fims:inputFile", "fims:Locator"),
                    new core.JobParameter("fims:outputLocation", "fims:Locator")
                ],
                [
                    new core.JobParameter("fims:outputFile", "fims:Locator")
                ],
                [
                    new core.JobParameter("ebucore:width"),
                    new core.JobParameter("ebucore:height")
                ]
            ),
            new core.JobParameterBag({
                "fims:inputFile": {
                    type: "fims:Locator",
                    awsS3Bucket: "private-repo.fims.tv",
                    awsS3Key: "media-file.mp4"
                },
                "fims:outputLocation": {
                    type: "fims:Locator",
                    awsS3Bucket: "private-repo.fims.tv",
                    awsS3Key: "thumbnails/"
                }
            }),
            new core.AsyncEndpoint("http://urlForJobSuccess", "http://urlForJobFailed")
        );

        core.canServiceAcceptJob(service, transformJob, (err) => {
            expect(err).toBeNull();

            callback(err);
        });
    });
});
