export enum TrampolineCommandIdentifier {
  AskPass = 'ASKPASS',
  GPG = 'GPG',
}

/** Represents a command in our trampoline mechanism. */
export interface ITrampolineCommand {
  /**
   * Identifier of the command.
   *
   * This will be used to find a suitable handler in the app to react to the
   * command.
   */
  readonly identifier: TrampolineCommandIdentifier

  /**
   * Parameters of the command.
   *
   * This corresponds to the command line arguments (argv) except the name of
   * the program (argv[0]).
   */
  readonly parameters: ReadonlyArray<string>

  /** Environment variables that were set when the command was invoked. */
  readonly environmentVariables: ReadonlyMap<string, string>

  /**
   * Data received from the standard input, if any. Otherwise, it's undefined.
   */
  readonly stdin: string | undefined
}

/** Represents the output of a command, with both stdout and stderr. */
export type TrampolineCommandOutput = {
  readonly stdout: string
  readonly stderr: string
}

/**
 * Represents a handler function for a trampoline command.
 *
 * @param   command The invoked trampoline command to handle.
 * @returns         A string with the result of the command (which will be
 * printed via
 *          stdout by the trampoline client), or undefined
 */
export type TrampolineCommandHandler = (
  command: ITrampolineCommand
) => Promise<TrampolineCommandOutput | undefined>
