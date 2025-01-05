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

    AsyncFunction("startServer") { (dbPath: String, promise: Promise) in
      Task {
        do {
            let result = try await startServer(dbPath: dbPath)
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

    AsyncFunction("transparentAddress") { (promise: Promise) in
      Task {
        do {
            let result = try await transparentAddress()
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }

    AsyncFunction("transactionPlanner") { (promise: Promise) in
      Task {
        do {
            let result = try await transactionPlanner()
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }

    AsyncFunction("authorize") { (planBytes: Data, promise: Promise) in
      Task {
        do {
            let result = try await authorize(planBytes: planBytes)
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }

    AsyncFunction("witnessAndBuild") { (transactionPlan: Data, authorizationData: Data, promise: Promise) in
      Task {
        do {
            let result = try await witnessAndBuild(transactionPlan: transactionPlan, authorizationData: authorizationData)
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }

    AsyncFunction("sync") { (promise: Promise) in
      Task {
        do {
            let result = try await sync()
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }

    AsyncFunction("loadLocalProvingKey") { (keyType: String, filePath: String, promise: Promise) in
      Task {
        do {
            let result = try await loadLocalProvingKey(keyType: keyType, filePath: filePath)
            promise.resolve(result)
        } catch {
            promise.reject(error) 
        }
      }
    }
  }
}