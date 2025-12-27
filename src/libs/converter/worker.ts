import magickWasmPath from "@/../node_modules/@imagemagick/magick-wasm/dist/magick.wasm?url";
import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
} from "@imagemagick/magick-wasm";
import ConverterManager from ".";

const manager = new ConverterManager(globalThis);

const convert = async (name: string, data: ArrayBuffer) => {
  console.debug(
    `received convert request for ${name} (${data.byteLength} bytes)`,
  );
  ImageMagick.readCollection(new Uint8Array(data), (col) => {
    col[0].clone((img) => {
      col.push(img);

      for (let i = 0; i < col.length; i++) {
        col[i].animationDelay = 1;
        col[i].animationIterations = 1;
      }

      col.write(MagickFormat.Gif, (d) => {
        const blob = new Blob([d as Uint8Array<ArrayBuffer>], {
          type: "image/gif",
        });

        manager.emit("convertResult", {
          success: true,
          name,
          data: URL.createObjectURL(blob),
        });
      });
    });
  });
};

const prepareEvents = () => {
  console.debug("preparing events");
  manager.on("convert", ({ name, data }) => convert(name, data));

  manager.emit("ready", {});
};

// init magick
const init = async () => {
  console.debug("initializing magick");

  initializeImageMagick(
    await fetch(magickWasmPath).then((r) => r.arrayBuffer()),
  )
    .then(() => {
      console.debug("initializing done!");
      prepareEvents();
    })
    .catch((e) =>
      manager.emit("error", {
        context: "loading magick",
        error: String(e),
      }),
    );
};

manager.once("init", () => init());
