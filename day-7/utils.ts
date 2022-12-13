interface File {
  name: string;
  size: number;
}

interface Directory {
  size: number;
  files: File[];
}

interface DirectoryMap {
  [key: string]: Directory;
}

interface Command {
  command: string;
  param: string | undefined;
  output: string[];
}

const parseCommands = (input: string): Command[] => {
  const commands = [];
  const lines = input.split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line.startsWith("$")) {
      const command: Command = {
        command: line.split(" ").slice(1, 2).join(" "),
        param: line.split(" ").slice(2)[0],
        output: [],
      };
      commands.push(command);
    } else {
      commands[commands.length - 1].output.push(line);
    }
  }
  return commands;
};

const createNewDirectory = (): Directory => {
  return { size: 0, files: [] };
};
const createNewFile = (name: string, size: number): File => {
  return { name, size };
};

const generateFileSystem = (commands: Command[]): DirectoryMap => {
  const pwd: string[] = [];
  const directoryMap: DirectoryMap = {};
  directoryMap["/"] = createNewDirectory();
  commands.forEach((command: Command) => {
    if (command.command === "cd") {
      // if going up a directory
      if (command.param === "..") {
        pwd.pop();
      } else if (command.param) {
        pwd.push(command.param);
      } else {
        throw new Error("Invalid command");
      }
      // if going down a directory
    }

    if (command.command === "ls") {
      command.output.forEach((line) => {
        if (line.startsWith("dir")) {
          const key = [...pwd, line.split(" ")[1]].join("/").replace("//", "/");
          if (!directoryMap[key]) {
            directoryMap[key] = createNewDirectory();
          }
        } else {
          const [size, name] = line.split(" ");
          const file = createNewFile(name, parseInt(size));
          const key = pwd.join("/").replace("//", "/");
          if (!directoryMap[key]) {
            throw new Error("directory does not exist");
          }
          // check if file already exists
          const existingFile = directoryMap[key].files.find((file) =>
            file.name === name
          );
          if (!existingFile) {
            directoryMap[key].files.push(file);
          }
        }
      });
    }
  });
  return directoryMap;
};

const calculateSizesOfDirectories = (
  directoryMap: DirectoryMap,
): DirectoryMap => {
  Object.keys(directoryMap).forEach((key) => {
    const size = directoryMap[key].files.reduce(
      (acc, file) => acc + file.size,
      0,
    );
    // generate a list of subdirectories to add to
    const keysToAddTo: string[] = ["/"];
    const keyParts = key.split("/");
    for (let index = 0; index < keyParts.length; index++) {
      const keyToAddTo = keyParts.slice(0, index + 1).join("/");
      if (keyToAddTo && keyToAddTo !== "/") {
        keysToAddTo.push(keyToAddTo);
      }
    }
    // add size to each subdirectory
    keysToAddTo.forEach((keyToAddTo) => {
      if (directoryMap[keyToAddTo]) {
        directoryMap[keyToAddTo].size += size;
      } else {
        console.log("could not find", directoryMap[keyToAddTo]);
      }
    });
  });
  return directoryMap;
};

const processInputIntoDirectoryMap = (input: string): DirectoryMap => {
  const commands = parseCommands(input);
  const directoryMap = generateFileSystem(commands);
  return calculateSizesOfDirectories(directoryMap);
};

const getSizeOfSmallDirectories = (
  directoryMap: DirectoryMap,
  limit: number,
): number => {
  return Object.keys(directoryMap)
    .filter((key) => directoryMap[key].size <= limit)
    .reduce((acc, key) => acc + directoryMap[key].size, 0);
};

export { getSizeOfSmallDirectories, processInputIntoDirectoryMap };
