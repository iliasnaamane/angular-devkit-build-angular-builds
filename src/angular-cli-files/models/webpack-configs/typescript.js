"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpack_1 = require("@ngtools/webpack");
const common_1 = require("./common");
const g = typeof global !== 'undefined' ? global : {};
const webpackLoader = g['_DevKitIsLocal']
    ? require.resolve('@ngtools/webpack')
    : '@ngtools/webpack';
function _createAotPlugin(wco, options, host, useMain = true, extract = false) {
    const { root, buildOptions } = wco;
    options.compilerOptions = options.compilerOptions || {};
    if (wco.buildOptions.preserveSymlinks) {
        options.compilerOptions.preserveSymlinks = true;
    }
    let i18nInFile = buildOptions.i18nFile
        ? path.resolve(root, buildOptions.i18nFile)
        : undefined;
    const i18nFileAndFormat = extract
        ? {
            i18nOutFile: buildOptions.i18nFile,
            i18nOutFormat: buildOptions.i18nFormat,
        } : {
        i18nInFile: i18nInFile,
        i18nInFormat: buildOptions.i18nFormat,
    };
    const additionalLazyModules = {};
    if (buildOptions.lazyModules) {
        for (const lazyModule of buildOptions.lazyModules) {
            additionalLazyModules[lazyModule] = path.resolve(root, lazyModule);
        }
    }
    const pluginOptions = Object.assign({ mainPath: useMain ? path.join(root, buildOptions.main) : undefined }, i18nFileAndFormat, { locale: buildOptions.i18nLocale, platform: buildOptions.platform === 'server' ? webpack_1.PLATFORM.Server : webpack_1.PLATFORM.Browser, missingTranslation: buildOptions.i18nMissingTranslation, sourceMap: buildOptions.sourceMap, additionalLazyModules, nameLazyFiles: buildOptions.namedChunks, forkTypeChecker: buildOptions.forkTypeChecker, contextElementDependencyConstructor: require('webpack/lib/dependencies/ContextElementDependency') }, options, { host });
    return new webpack_1.AngularCompilerPlugin(pluginOptions);
}
function getNonAotConfig(wco, host) {
    const { tsConfigPath } = wco;
    return {
        module: { rules: [{ test: /\.tsx?$/, loader: webpackLoader }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath, skipCodeGeneration: true }, host)]
    };
}
exports.getNonAotConfig = getNonAotConfig;
function getAotConfig(wco, host, extract = false) {
    const { tsConfigPath, buildOptions } = wco;
    const loaders = [webpackLoader];
    if (buildOptions.buildOptimizer) {
        loaders.unshift({
            loader: common_1.buildOptimizerLoader,
            options: { sourceMap: buildOptions.sourceMap }
        });
    }
    const test = /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/;
    return {
        module: { rules: [{ test, use: loaders }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath }, host, true, extract)]
    };
}
exports.getAotConfig = getAotConfig;
function getNonAotTestConfig(wco, host) {
    const { tsConfigPath } = wco;
    return {
        module: { rules: [{ test: /\.tsx?$/, loader: webpackLoader }] },
        plugins: [_createAotPlugin(wco, { tsConfigPath, skipCodeGeneration: true }, host, false)]
    };
}
exports.getNonAotTestConfig = getNonAotTestConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvYnVpbGRfYW5ndWxhci9zcmMvYW5ndWxhci1jbGktZmlsZXMvbW9kZWxzL3dlYnBhY2stY29uZmlncy90eXBlc2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBV0EsNkJBQTZCO0FBQzdCLDhDQUkwQjtBQUMxQixxQ0FBZ0Q7QUFJaEQsTUFBTSxDQUFDLEdBQVEsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMzRCxNQUFNLGFBQWEsR0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDL0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUM7SUFDckMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0FBR3ZCLDBCQUNFLEdBQXlCLEVBQ3pCLE9BQVksRUFDWixJQUEyQixFQUMzQixPQUFPLEdBQUcsSUFBSSxFQUNkLE9BQU8sR0FBRyxLQUFLO0lBRWYsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDbkMsT0FBTyxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztJQUV4RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsZUFBZSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUNsRCxDQUFDO0lBRUQsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVE7UUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFDM0MsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUVkLE1BQU0saUJBQWlCLEdBQUcsT0FBTztRQUMv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LENBQUM7QUFDSixDQUFDO0FBckJELG9DQXFCQztBQUVELDZCQUFvQyxHQUF5QixFQUFFLElBQTJCO0lBQ3hGLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFN0IsTUFBTSxDQUFDO1FBQ0wsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFO1FBQy9ELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUYsQ0FBQztBQUNKLENBQUM7QUFQRCxrREFPQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlXG4vLyBUT0RPOiBjbGVhbnVwIHRoaXMgZmlsZSwgaXQncyBjb3BpZWQgYXMgaXMgZnJvbSBBbmd1bGFyIENMSS5cbmltcG9ydCB7IHRhZ3MsIHZpcnR1YWxGcyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IFN0YXRzIH0gZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7XG4gIEFuZ3VsYXJDb21waWxlclBsdWdpbixcbiAgQW5ndWxhckNvbXBpbGVyUGx1Z2luT3B0aW9ucyxcbiAgUExBVEZPUk1cbn0gZnJvbSAnQG5ndG9vbHMvd2VicGFjayc7XG5pbXBvcnQgeyBidWlsZE9wdGltaXplckxvYWRlciB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFdlYnBhY2tDb25maWdPcHRpb25zIH0gZnJvbSAnLi4vYnVpbGQtb3B0aW9ucyc7XG5cblxuY29uc3QgZzogYW55ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB7fTtcbmNvbnN0IHdlYnBhY2tMb2FkZXI6IHN0cmluZyA9IGdbJ19EZXZLaXRJc0xvY2FsJ11cbiAgPyByZXF1aXJlLnJlc29sdmUoJ0BuZ3Rvb2xzL3dlYnBhY2snKVxuICA6ICdAbmd0b29scy93ZWJwYWNrJztcblxuXG5mdW5jdGlvbiBfY3JlYXRlQW90UGx1Z2luKFxuICB3Y286IFdlYnBhY2tDb25maWdPcHRpb25zLFxuICBvcHRpb25zOiBhbnksXG4gIGhvc3Q6IHZpcnR1YWxGcy5Ib3N0PFN0YXRzPixcbiAgdXNlTWFpbiA9IHRydWUsXG4gIGV4dHJhY3QgPSBmYWxzZVxuKSB7XG4gIGNvbnN0IHsgcm9vdCwgYnVpbGRPcHRpb25zIH0gPSB3Y287XG4gIG9wdGlvbnMuY29tcGlsZXJPcHRpb25zID0gb3B0aW9ucy5jb21waWxlck9wdGlvbnMgfHwge307XG5cbiAgaWYgKHdjby5idWlsZE9wdGlvbnMucHJlc2VydmVTeW1saW5rcykge1xuICAgIG9wdGlvbnMuY29tcGlsZXJPcHRpb25zLnByZXNlcnZlU3ltbGlua3MgPSB0cnVlO1xuICB9XG5cbiAgbGV0IGkxOG5JbkZpbGUgPSBidWlsZE9wdGlvbnMuaTE4bkZpbGVcbiAgICA/IHBhdGgucmVzb2x2ZShyb290LCBidWlsZE9wdGlvbnMuaTE4bkZpbGUpXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgaTE4bkZpbGVBbmRGb3JtYXQgPSBleHRyYWN0XG4gICAgPyB7XG4gICAgICBpMThuT3V0RmlsZTogYnVpbGRPcHRpb25zLmkxOG5GaWxlLFxuICAgICAgaTE4bk91dEZvcm1hdDogYnVpbGRPcHRpb25zLmkxOG5Gb3JtYXQsXG4gICAgfSA6IHtcbiAgICAgIGkxOG5JbkZpbGU6IGkxOG5JbkZpbGUsXG4gICAgICBpMThuSW5Gb3JtYXQ6IGJ1aWxkT3B0aW9ucy5pMThuRm9ybWF0LFxuICAgIH07XG5cbiAgY29uc3QgYWRkaXRpb25hbExhenlNb2R1bGVzOiB7IFttb2R1bGU6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIGlmIChidWlsZE9wdGlvbnMubGF6eU1vZHVsZXMpIHtcbiAgICBmb3IgKGNvbnN0IGxhenlNb2R1bGUgb2YgYnVpbGRPcHRpb25zLmxhenlNb2R1bGVzKSB7XG4gICAgICBhZGRpdGlvbmFsTGF6eU1vZHVsZXNbbGF6eU1vZHVsZV0gPSBwYXRoLnJlc29sdmUoXG4gICAgICAgIHJvb3QsXG4gICAgICAgIGxhenlNb2R1bGUsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsdWdpbk9wdGlvbnM6IEFuZ3VsYXJDb21waWxlclBsdWdpbk9wdGlvbnMgPSB7XG4gICAgbWFpblBhdGg6IHVzZU1haW4gPyBwYXRoLmpvaW4ocm9vdCwgYnVpbGRPcHRpb25zLm1haW4pIDogdW5kZWZpbmVkLFxuICAgIC4uLmkxOG5GaWxlQW5kRm9ybWF0LFxuICAgIGxvY2FsZTogYnVpbGRPcHRpb25zLmkxOG5Mb2NhbGUsXG4gICAgcGxhdGZvcm06IGJ1aWxkT3B0aW9ucy5wbGF0Zm9ybSA9PT0gJ3NlcnZlcicgPyBQTEFURk9STS5TZXJ2ZXIgOiBQTEFURk9STS5Ccm93c2VyLFxuICAgIG1pc3NpbmdUcmFuc2xhdGlvbjogYnVpbGRPcHRpb25zLmkxOG5NaXNzaW5nVHJhbnNsYXRpb24sXG4gICAgc291cmNlTWFwOiBidWlsZE9wdGlvbnMuc291cmNlTWFwLFxuICAgIGFkZGl0aW9uYWxMYXp5TW9kdWxlcyxcbiAgICBuYW1lTGF6eUZpbGVzOiBidWlsZE9wdGlvbnMubmFtZWRDaHVua3MsXG4gICAgZm9ya1R5cGVDaGVja2VyOiBidWlsZE9wdGlvbnMuZm9ya1R5cGVDaGVja2VyLFxuICAgIGNvbnRleHRFbGVtZW50RGVwZW5kZW5jeUNvbnN0cnVjdG9yOiByZXF1aXJlKCd3ZWJwYWNrL2xpYi9kZXBlbmRlbmNpZXMvQ29udGV4dEVsZW1lbnREZXBlbmRlbmN5JyksXG4gICAgLi4ub3B0aW9ucyxcbiAgICBob3N0LFxuICB9O1xuICByZXR1cm4gbmV3IEFuZ3VsYXJDb21waWxlclBsdWdpbihwbHVnaW5PcHRpb25zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vbkFvdENvbmZpZyh3Y286IFdlYnBhY2tDb25maWdPcHRpb25zLCBob3N0OiB2aXJ0dWFsRnMuSG9zdDxTdGF0cz4pIHtcbiAgY29uc3QgeyB0c0NvbmZpZ1BhdGggfSA9IHdjbztcblxuICByZXR1cm4ge1xuICAgIG1vZHVsZTogeyBydWxlczogW3sgdGVzdDogL1xcLnRzeD8kLywgbG9hZGVyOiB3ZWJwYWNrTG9hZGVyIH1dIH0sXG4gICAgcGx1Z2luczogW19jcmVhdGVBb3RQbHVnaW4od2NvLCB7IHRzQ29uZmlnUGF0aCwgc2tpcENvZGVHZW5lcmF0aW9uOiB0cnVlIH0sIGhvc3QpXVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW90Q29uZmlnKFxuICB3Y286IFdlYnBhY2tDb25maWdPcHRpb25zLFxuICBob3N0OiB2aXJ0dWFsRnMuSG9zdDxTdGF0cz4sXG4gIGV4dHJhY3QgPSBmYWxzZVxuKSB7XG4gIGNvbnN0IHsgdHNDb25maWdQYXRoLCBidWlsZE9wdGlvbnMgfSA9IHdjbztcblxuICBjb25zdCBsb2FkZXJzOiBhbnlbXSA9IFt3ZWJwYWNrTG9hZGVyXTtcbiAgaWYgKGJ1aWxkT3B0aW9ucy5idWlsZE9wdGltaXplcikge1xuICAgIGxvYWRlcnMudW5zaGlmdCh7XG4gICAgICBsb2FkZXI6IGJ1aWxkT3B0aW1pemVyTG9hZGVyLFxuICAgICAgb3B0aW9uczogeyBzb3VyY2VNYXA6IGJ1aWxkT3B0aW9ucy5zb3VyY2VNYXAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgdGVzdCA9IC8oPzpcXC5uZ2ZhY3RvcnlcXC5qc3xcXC5uZ3N0eWxlXFwuanN8XFwudHMpJC87XG5cbiAgcmV0dXJuIHtcbiAgICBtb2R1bGU6IHsgcnVsZXM6IFt7IHRlc3QsIHVzZTogbG9hZGVycyB9XSB9LFxuICAgIHBsdWdpbnM6IFtfY3JlYXRlQW90UGx1Z2luKHdjbywgeyB0c0NvbmZpZ1BhdGggfSwgaG9zdCwgdHJ1ZSwgZXh0cmFjdCldXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROb25Bb3RUZXN0Q29uZmlnKHdjbzogV2VicGFja0NvbmZpZ09wdGlvbnMsIGhvc3Q6IHZpcnR1YWxGcy5Ib3N0PFN0YXRzPikge1xuICBjb25zdCB7IHRzQ29uZmlnUGF0aCB9ID0gd2NvO1xuXG4gIHJldHVybiB7XG4gICAgbW9kdWxlOiB7IHJ1bGVzOiBbeyB0ZXN0OiAvXFwudHN4PyQvLCBsb2FkZXI6IHdlYnBhY2tMb2FkZXIgfV0gfSxcbiAgICBwbHVnaW5zOiBbX2NyZWF0ZUFvdFBsdWdpbih3Y28sIHsgdHNDb25maWdQYXRoLCBza2lwQ29kZUdlbmVyYXRpb246IHRydWUgfSwgaG9zdCwgZmFsc2UpXVxuICB9O1xufVxuIl19