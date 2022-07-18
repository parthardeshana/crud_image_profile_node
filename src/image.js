let profileimage = null;
let dir = null;
if (/^data:([A-Za-z-+/]+);base64,(.+)$/.test(profileImage)) {
    var matches = result.profileImage.match(
        /^data:([A-Za-z-+/]+);base64,(.+)$/
    ),
        response = {};
    if (matches.length !== 3) {
        return new Error("Invalid input string");
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], "base64");
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    var val = Math.floor(1000 + Math.random() * 9000);
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let imageName = "profile" + "-" + Date.now() + "-" + val;
    let imageType = "." + extension;
    profileimage = imageName + imageType;
    dir = `./uploads/`;
    // dir = `${BASE_URL_IMAGE}/public/uploads/profile/`;

    await fs.ensureDir(dir, (err) => {
        fs.writeFileSync(dir + "/" + profileimage, imageBuffer, "utf8");

        console.log("erererere", err); // => null
    });
}