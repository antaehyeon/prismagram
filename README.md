**노마드코더 instagram 2.0 backend 부분 수강중 입니다**

**이슈목록**

1. Requires Babel “7.0.0-0” but was loaded with “6.26.3”

   - https://github.com/babel/babel/issues/8482

   - 해결책 `yarn remove babel-cli && yarn add @babel/cli`

2. react-native-image-crop-picker

   - 증상 : iOS 빌드 에러 (not found 'React/Core')
   - 원인 : React-Native v0.60.0 으로 올라가면서 IOS 쪽 React 관련 라이브러리 경로가 맞지 않음
     - Reac/Core -> React-Core

   - 임시 해결책 : node_modules/react-native-image-crop-picker 폴더로 가서 .podspec 의 `s.dependency React/Core` 를 `React-Core` 로 변경

3. react-native-image-crop-picker 함수 동작시켰을 때 앱이 꺼지는 부분

   - Docs 똑바로 읽을 것

     ```
     In Xcode open Info.plist and add string key NSPhotoLibraryUsageDescription with value that describes why you need access to user photos. More info here https://forums.developer.apple.com/thread/62229. Depending on what features you use, you also may need NSCameraUsageDescription and NSMicrophoneUsageDescription keys.
     ```

     해당 내용을 info.plist 에 추가해주면 된다

4. 