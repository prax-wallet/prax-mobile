import ExpoModulesCore
import Foundation

public class PenumbraSdkModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('PenumbraSdkModule')` in JavaScript.
    Name("PenumbraSdkModule")

    AsyncFunction("createAppStateContainer") { (promise: Promise) in
      Task {
        do {
            let result = try await createAppStateContainer()
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }

    AsyncFunction("startServer") { (promise: Promise) in
      Task {
        do {
            let result = try await startServer()
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }

    AsyncFunction("getBlockHeight") { (promise: Promise) in
      Task {
        do {
            let result = try await getBlockHeight()
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }
  }
}