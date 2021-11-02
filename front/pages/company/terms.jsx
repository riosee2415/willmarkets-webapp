import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import { emptyCheck } from "../../components/commonUtils";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import {} from "@ant-design/icons";
import {
  ColWrapper,
  RowWrapper,
  Image,
  Wrapper,
  WholeWrapper,
  RsWrapper,
  CommonButton,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import SubBanner from "../../components/SubBanner";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const PreText = styled.pre`
  white-space: pre-line;
  margin: 0;
  padding: 80px;
  font-size: 13px;
`;

const Terms = () => {
  const { t } = useTranslation(["privacy"]);
  return (
    <ClientLayout>
      <SubBanner />
      <RsWrapper ju={`flex-start`} width={`100%`}>
        <Wrapper
          al={`center`}
          fontSize={`28px`}
          fontWeight={`600`}
          margin={`50px 0`}>
          {i18next.language === `en`
            ? `TERMS AND CONDITIONS FOR ACCESS AND USE OF WELL-MARKET WEBSITES`
            : ` WILLMARKETS 웹사이트 액세스 및 사용 약관`}
        </Wrapper>
        <Wrapper
          al={`flex-start`}
          ju={`flex-start`}
          margin={`0 0 100px 0px`}
          width={`50%`}
          height={`800px`}
          shadow={`rgb(220 220 220) 0px 5px 10px;`}>
          <PreText>
            {i18next.language === `en`
              ? `
              TERMS AND CONDITIONS FOR ACCESS AND USE OF WELL-MARKET WEBSITES
           
              PLEASE READ ALL THE TERMS OF USE FOR THIS WEBSITE ("TCU") BEFORE USING THIS SITE. By
              accessing, linking to, or continuing to use any service accessible through this website, you signify
              your acceptance of TCU. WILL-MARKETS reserves the right to modify, remove or add TCUs at any
              time. Such modifications shall take effect immediately. Therefore, please continue to review TCU
              whenever you access, connect to or use WILL-MARKETS' website (the "Website"). Any access, link,
              or use of any website or service accessible from the website after posting of modifications to TCU
              constitutes acceptance of the amended TCU. If you do not wish to accept TCU at any time, you may
              not access, link or use the Website. ALL TERMS AND CONDITIONS PROVIDED BY WILL-MARKETS
              ARE EXPRESSLY DISCLAIMED BY WILL-MARKETS IN THE EVENT OF CONFLICT OR CONFLICT WITH
              TCU AND WILL BE void.
            
              GENERAL TERMS

              1. You represent that you have read and agree to be bound by the TCU.
              
              2. The WEBSITE, including but not limited to text, content, photographs, video, audio, links,
              software and graphics, is protected by copyrights, trademarks, service marks, international
              treaties, and/or other proprietary rights and laws of Switzerland and other countries. The
              WEBSITE is also protected as a collective work or compilation under Swiss copyright and
              other laws and treaties. All individual articles, columns and other elements making up the
              WEBSITE are also copyrighted works. You agree to abide by all applicable copyright and
              other laws, as well as any additional copyright notices or restrictions co ntained in the
              WEBSITE. You acknowledge that the WEBSITE has been developed, compiled, prepared,
              revised, selected, and arranged by WILL-MARKETS, its general and limited partners, and its
              subsidiaries, and their respective general partners and affiliates ( collectively "WILLMARKETS") and others (including certain other information sources) through the application
              of methods and standards of judgment developed and applied through the expenditure of
              substantial time, effort, and money and constitutes valuable intellectual property of WILLMARKETS and such others. You agree to protect the proprietary rights of WILL-MARKETS and
              all others having rights in the WEBSITE during and after the term of this agreement and to
              comply with all reasonable written requests made by WILL-MARKETS or its suppliers and 
              licensors of content, equipment, or otherwise ("Suppliers") to protect the ir and others'
              contractual, statutory, and law rights in the WEBSITE. You agree to notify WILL-MARKETS in
              writing promptly upon becoming aware of any unauthorized access or use of the WEBSITE
              by any individual or entity or of any claim that the WEBSITE infringes upon any copyright,
              trademark, or other contractual, statutory, or law rights. All present and future rights in and
              to trade secrets, patents, copyrights, trademarks, service marks, know -how, and other
              proprietary rights of any type under the laws of any governmental authority, domestic or
              foreign, including rights in and to all applications and registrations relating to the WEBSITE
              (the "Intellectual Property Rights") shall, as between you and WILL-MARKETS, at all times be
              and remain the sole and exclusive property of WILL-MARKETS. All present and future rights
              in and title to the WEBSITE (including the right to exploit the WEBSITE and any portions of
              the WEBSITE over any present or future technology) are reserved to WILL-MARKETS for its
              exclusive use. Except as specifically permitted by the TCU, you may not copy or make any
              use of the WEBSITE or any portion thereof. Except as specifically permitted herein, you
              shall not use the Intellectual Property Rights or the WEBSITE, or the names of any individu al
              participant in, or contributor to, the WEBSITE, or any variations or derivatives thereof, for
              any purpose, without WILL-MARKETS prior written approval. 
              
              3. Restrictions on Use 

              You may not use the WEBSITE for any illegal purpose, for the facilitation of the violation of
              any law or regulation, or in any manner inconsistent with the TCU. Except written
              agreement between you and WILL-MARKETS, you agree to use the WEBSITE solely for
              your own non-commercial use and benefit, and not for resale or other transfer or
              disposition to, or use by or for the benefit of, any other person or entity. You agree not to
              use, transfer, distribute, or dispose of any information contained in the WEBSITE in any
              manner that could compete with the business of WILL-MARKETS or any of its Suppliers.
              You may not copy, reproduce, recompile, decompile, disassemble, reverse engineer,
              distribute, publish, display, perform, modify, upload to, create derivative works from, 
              transmit, or in any way exploit any part of the WEBSITE, except that you may download
              material from the WEBSITE and/or make one print copy for your own personal, non -
              commercial use, provided that you retain all copyright and other proprietary notices. You
              may not recirculate, redistribute or publish the analysis and presentation included in the
              WEBSITE without WILL-MARKETS prior written consent. You may not offer any part of the
              WEBSITE for sale or distribute it over any other medium including but not limited to overthe-air television or radio broadcast, a computer network or hyperlink framing on the
              Internet without the prior written consent of WILL-MARKETS. The WEBSITE and the
              information contained therein may not be used to construct a database of any kind. Nor
              may the WEBSITE be stored (in its entirety or in any part) in databases for access by you
              or any third party or to distribute any database WEBSITEs containing all or part of the
              WEBSITE. You may not use the WEBSITE in any way to improve the quality of any data
              sold or contributed by you to any third party.
              You may not input, distribute, upload, post, email, transmit or otherwise make available
              any content through the WEBSITE that: (i) is promotional in nature, including solicitations
              for funds or business, without the prior written authorization of WILL-MARKETS, or
              constitutes junk mail, spam, chain letters, pyramid schemes or the like; (ii) is unlawful,
              harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libellous,
              invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable; (iii)
              you do not have the right to make available under any law or under contract ual or fiduciary
              relationships (such as inside information, proprietary and confidential information learned
              or disclosed as part of employment relationships or under nondisclosure agreements); (iv)
              infringes any patent, trademark, trade secret, copyright or other proprietary rights of any
              party; (v) contains software viruses or any other computer code, files or programs
              designed to interrupt, destroy or limit the functionality of any computer software or
              hardware, or telecommunications equipment; (vi) is harmful to minors; or (vii) constitutes
              the personally identifiable information of any other person that such person has not
              authorized you to disclose.
              You may not use any of the trademarks, trade names, service marks, copyrights, or logos
              of WILL-MARKETS in any manner which creates the impression that such items belong to
              or are associated with you or are used with WILL-MARKETS consent, and you
              acknowledge that you have no ownership rights in and to any of such items.
              You may neither interfere with nor attempt to interfere with nor otherwise disrupt the
              proper working of the WEBSITE, any activities conducted on or through the WEBSITE or
              any servers or networks connected to the WEBSITE. You may neither obtain nor attempt
              to obtain through any means any materials or information on the WEBSITE that have not
              been intentionally made publicly available either by public display on the WEBSITE or
              through accessibility by a visible link on the WEBSITE. You shall not violate the security of
              the WEBSITE or attempt to gain unauthorized access to the WEBSITE, data, materials,
              information, computer systems or networks connected to any server associated with the
              WEBSITE, through hacking, DDoS attack, password timing or any other means. You may
              neither take nor attempt any action that, in the sole discretion of WILL-MARKETS, imposes
              or may impose an unreasonable or disproportionately large load or burden on the
              WEBSITE or the infrastructure of the WEBSITE. You shall not use or attempt to use any
              "scraper," "robot," "bot," "spider," "data mining," "computer code," or any other automate
              device, program, tool, algorithm, process or methodology to access, acquire, copy, or
              monitor any portion of the WEBSITE, any data or content found on or accessed through
              the WEBSITE, or any other WEBSITE information without the prior express written consent
              of WILL-MARKETS. You may not forge headers or otherwise manipulate identifiers in
              order to disguise the origin of any other content.
              You confirm having been informed and understood that the WEBSITE does not constitute
              in itself a service of WILL-MARKETS.

              4. License
 
              (i) You acquire absolutely no rights or licenses in or to the WEBSITE and materials
              contained within the WEBSITE other than the limited right to use the WEBSITE in
              accordance with the TCU. Should you choose to download content from the WEBSITE, you
              must do so in accordance with the TCU. Such download is licensed to you by WILL -
              MARKETS ONLY for your own personal, non-commercial use in accordance with the TCU
              and does not transfer any other rights to you.
              (ii) If you submit material to the WEBSITE or to WILL-MARKETS or its representative,
              unless WILL-MARKETS indicates otherwise, you grant to WILL-MARKETS a perpetual,
              nonexclusive, irrevocable, fully paid, royalty -free, sub-licensable and transferable (in
              whole or in part) worldwide right and license in any and all media, now known or later
              developed, to use, publish, reproduce, display, modify, transmit digitally, create derivative
              works based upon, distribute, copy, and otherwise exploit, such content for any purpose
              whatsoever (including, without limitation, advertising, commercial, promotional and
              publicity purposes) in WILL-MARKETS discretion without additional notice, attribution or
              consideration to you or to any other person or entity. You also permit any other
              WEBSITE'S user to access, store, or reproduce such material for that user's personal use.
              You grant WILL-MARKETS the right to use the name that you submit in connection with
              such content. You represent and warrant that you own or otherwise control all of the r ights
              to the material that you submit; that the material you submit is truthful and accurate; that
              use of the material you supply does not violate this TCU and will not cause injury to any
              person or entity; and that you will indemnify WILL-MARKETS and its Suppliers, agents,
              directors, officers, employees, representatives, successors, and assigns for all claims
              resulting from material you supply. WILL-MARKETS and its Suppliers, agents, directors,
              officers, employees, representatives, successors, and assigns disclaim any responsibility
              and assume no liability for any material submitted by you or any third party.

              5. Fees
              Except express written agreement, the access to and use of the WEBSITE is free of charge
              and does not require to be a client of WILL-MARKETS or of its Group companies.
             
              Except express written agreement, the access to and use of the WEBSITE is free of charge
              and does not require to be a client of WILL-MARKETS or of its Group companies.
              6. 
              Residence and Legal Restrictions
             
              The WEBSITE provision is not aimed at residents of jurisdictions from which for whatever
              reason the access to and use of the WEBSITE or any part thereof is either prohibited or
              strictly regulated. If you are subject to such restrictions, you may not access and use the
              WEBSITE or any part thereof. Please note that all trading related information on the
              WEBSITE is not intented for Belgium residents.

              7. Disclaimer and Limitation of Liability

              (i) YOU AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK AND
              ACKNOWLEDGE THAT THE SERVICE AND ANYTHING CONTAINED WITHIN THE
              WEBSITE, INCLUDING, BUT NOT LIMITED TO, CONTENT OR ADVERTISEMENTS ARE
              PROVIDED "AS IS" AND "AS AVAILABLE," AND THAT DUKASCOPY MAKES NO
              WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE WEBSITE, INCLUDING,
              BUT NOT LIMITED TO, MERCHANTABILITY, NON-INFRINGEMENT, TITLE, OR FITNESS
              FOR A PARTICULAR PURPOSE OR USE.
              (ii) WILL-MARKETS does not warrant that the WEBSITE is compatible with your equipment
              or that the WEBSITE, or e-mail sent by WILL-MARKETS or its representative, is free of
              errors or viruses, worms or "Trojan horses," or any other harmful, invasive, or corrupted
              files, and is not liable for any damage you may suffer as a result of such destructive
              features. You agree that WILL-MARKETS and its Suppliers, shareholders, agents,
              directors, officers, employees, representatives, successors, and assigns shall have no
              responsibility or liability for: (i) any injury or damages, whether caused by the negligence
              of WILL-MARKETS, their respective affiliates, Suppliers, agents, directors, officers,
              employees, representatives, general partner, subsidiaries, successors, and assigns, or
              otherwise arising in connection with the WEBSITE and shall not be liable for any lost
              profits, losses, punitive, incidental or consequential damages, or any claim against WILLMARKETS by any other party; or (ii) any fault, inaccuracy, omission, delay, or any other
              failure in the WEBSITE caused by your computer equipment or arising from your use of the
              WEBSITE on such equipment. The content of other websites, services, goods, or
              advertisements that may be linked to the WEBSITE is not maintained or controlled by
              WILL-MARKETS. WILL-MARKETS is therefore not responsible for the availability, content,
              or accuracy of other websites, services, or goods that may be linked to, or advertised on
              the WEBSITE. WILL-MARKETS does not: (a) make any warranty, express or implied, with
              respect to the use of the links provided on, or to, the WEBSITE; (b) guarantee the
              accuracy, completeness, usefulness or adequacy of any other websites, services, goods,
              or advertisements that may be linked to the WEBSITE; or (c) make any endorsement,
              express or implied, of any other websites, services, goods, or advertisements that may be
              linked to the WEBSITE. WILL-MARKETS is also not responsible for the reliability or
              continued availability of the telephone lines, wireless services, communications media,
              and equipment you use to access the WEBSITE. You understand and acknowledge that
              WILL-MARKETS and/or third-party contributors to the WEBSITE may choose at any time to
              inhibit or prohibit their content from being accessed under the TCU.
              (iii) You acknowledge that: (i) the WEBSITE is provided for information purposes only; (ii)
              the WEBSITE may include certain information taken from stock exchanges and other
              sources from around the world; (iii) WILL-MARKETS does not guarantee the sequence,
              accuracy, completeness, fitness for a specific purpose or timeliness of the WEBSITE; (iv)
              the provision of certain parts of the WEBSITE is subject to the terms and conditions of
              other agreements to which WILL-MARKETS is a party; (v) none of the information
              contained on the WEBSITE constitutes a solicitation, offer, opinion, or recommendation by
              WILL-MARKETS to use, buy or sell any security or other financial instrument or service, or
              to provide legal, tax, accounting, or investment advice or services regarding the
              profitability or suitability of any security or service; and (vi) the information provided on the
              WEBSITE is not intended for use by, or distribution to, any person or entity in any
              jurisdiction or country where such use or distribution would be contrary to law or
              regulation. Accordingly, anything to the contrary herein set forth notwithstanding, WILLMARKETS, its Suppliers, agents, directors, officers, employees, representatives,
              successors, and assigns shall not, directly or indirectly, be liable, in any way, to you or
              any other person for any: (a) inaccuracies or errors in or omissions from the WEBSITE
              including, but not limited to, quotes and financial data; (b) delays, errors, or interruptions
              in the transmission or delivery of the WEBSITE and/or any part of its content; or (c) loss or
              damage arising therefrom or occasioned thereby, or by any reason of non-performance.
              (iv) UNDER NO CIRCUMSTANCES, INCLUDING BUT NOT LIMITED TO NEGLIGENCE,
              SHALL WILL-MARKETS, ITS SUPPLIERS, AGENTS, DIRECTORS, OFFICERS,
              EMPLOYEES, REPRESENTATIVES, SUCCESSORS, OR ASSIGNS BE LIABLE TO YOU
              FOR DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR
              EXEMPLARY DAMAGES EVEN IF WILL-MARKETS HAS BEEN ADVISED SPECIFICALLY
              OF THE POSSIBILITY OF SUCH DAMAGES, ARISING FROM THE USE OF OR INABILITY
              TO USE THE WEBSITE OR ANY LINKS OR ITEMS ON THE WEBSITE OR ANY
              PROVISION OF THE TCU, SUCH AS, BUT NOT LIMITED TO, LOSS OF REVENUE OR
              ANTICIPATED PROFITS OR LOST BUSINESS. APPLICABLE LAW MAY NOT ALLOW THE
              LIMITATION OR EXCLUSION OF LIABILITY OR INCIDENTAL OR CONSEQUENTIAL
              DAMAGES. IN NO EVENT SHALL WILL-MARKETS TOTAL LIABILITY TO YOU FOR ALL
              DAMAGES, LOSSES AND CAUSES OF ACTION (WHETHER IN CONTRACT OR TORT,
              INCLUDING BUT NOT LIMITED TO, NEGLIGENCE) EXCEED THE AMOUNT PAID BY
              YOU TO WILL-MARKETS, IF ANY, FOR ACCESSING THE WEBSITE.
              8. Your Authority to Agree to this TCU

              You represent, warrant and covenant that you have the power and authority to enter into this
              agreement according to article 12 ff. of the Swiss Civil Code.

              9. Indemnification 

              You agree, at your own expense, to indemnify, defend and hold harmless WILL-MARKETS,
              its Suppliers, agents, directors, officers, employees, representatives, successors, and
              assigns from and against any and all claims, damages, liabilities, costs, and expenses,
              including reasonable attorneys' and experts' fees, arising out of or in connec tion with the
              WEBSITE, or any links on the WEBSITE, including, but not limited to: (i) your use or
              someone using your computer's use of the WEBSITE; (ii) a violation of the TCU by you or
              anyone using your computer (or account, where applicable); (iii) a cl aim that any use of the
              WEBSITE by you or someone using your computer infringes any intellectual property right
              of any third party, or any right of privacy or publicity, is libellous or defamatory, or otherwise
              results in injury or damage to any third party; (iv) any deletions, additions, insertions or
              alterations to, or any unauthorized use of the WEBSITE by you or someone using your
              computer; (v) any misrepresentation or breach of representation or warranty made by you
              contained herein; or (vi) any breach of any covenant or agreement to be performed by you
              hereunder. You agree to pay any and all costs, damages, and expenses, including, but not
              limited to, reasonable attorneys' fees and costs awarded against or otherwise incurred by
              or in connection with or arising from any such claim, suit, action, or proceeding attributable
              to any such claim. WILL-MARKETS reserves the right, at its own expense, to assume the
              exclusive defence and control of any matter otherwise subject to indemnification by you, in
              which event you will fully cooperate with WILL-MARKETS in asserting any available defence.
              You acknowledge and agree to pay WILL-MARKETS reasonable attorneys' fees incurred in
              connection with any and all lawsuits brought against you by WILL-MARKETS under the TCU
              and any other terms and conditions applicable to the access and use of the WEBSITE,
              including without limitation, lawsuits arising from your failure to indemnify WILL-MARKETS
              pursuant to the TCU.

              10. Termination 

              You may terminate the TCU, with or without cause and at any time, by discontinuing your
              access and use of the WEBSITE and destroying all materials obtained from the WEBSITE.
              You agree that, without notice, WILL-MARKETS may terminate the TCU, or suspend your
              access to the WEBSITE, with or without cause at any time and effective immediately. The
              TCU will terminate immediately without notice from WILL-MARKETS if you, in WILLMARKETS sole discretion, fail to comply with any provision of the TCU.
              WILL-MARKETS shall not be liable to you or any third party for the termination or
              suspension of the WEBSITE and/or access to the latter, or any claims related to the
              termination or suspension of the WEBSITE. Upon termination of the T CU by you or WILLMARKETS, you must discontinue your access and use of the WEBSITE and destroy
              promptly all materials obtained from the WEBSITE and any copies thereof.

              11. Applicable Law and Jurisdiction

              The place of performance of the TCU and of all the obligations arising from the TCU is
              Geneva, Switzerland.
              The TCU are subject to and shall be construed in accordance with Swiss law without
              reference to its conflict of law rules, such as the Swiss Private International Law act, as
              the sole and exclusive governing law.
              Any dispute, controversy or claim arising out of, or in relation to, the TCU, including the
              validity, invalidity, breach, or termination thereof, shall be resolved by arbitration in
              accordance with the Swiss Rules of International Arbitration of the Swiss Chambers'
              Arbitration Institution in force on the date on which the Notice of Arbitration is submitted in
              accordance with these Rules. The number of Arbitrators shall be three, unless the Rules
              specify otherwise. The seat of the Arbitration shall be Geneva, Switzerland. The arbitral
              proceedings shall be conducted in English.
              This Section shall survive any termination of the TCU.
              12. Miscellaneous 
  
              You accept that WILL-MARKETS has the right to change the accessibility, content or
              technical specifications of any aspect of the WEBSITE at any time in WILL-MARKETS sole
              discretion. You further accept that such changes may result in you being unable to access
              and/or use the WEBSITE. The failure of WILL-MARKETS to exercise or enforce any right
              or provision of the TCU shall not constitute a waiver of such right or prov ision. Sections 2
              through 13 shall survive any termination of the TCU.
              In case of discrepancy between the English version of the WEBSITE and other language
              versions of the WEBSITE, the English version shall prevail. Translations of the WEBSITE
              in other languages are not binding on WILL-MARKETS.
              13. Headings  
              
              The section titles in the TCU are used solely for the convenience of you and WILL-MARKETS
              and have no legal or contractual significance.
           
              14. Severability

              If at any time any provision of the TCU is or becomes illegal, invalid or unenforceable in any
              respect under the law of any jurisdiction, that provision will be enforced to the maximum
              extent permissible and neither the legality, validity or enforceability of the remaining
              provisions of the TCU under the law of that jurisdiction nor the legality, validity or
              enforceability of such provision under the law of any other jurisdiction shall be in any way
              affected

              15.Entire Agreement

              The TCU and any other terms and conditions of use on the WEBSITE, and its successor, 
              constitute the entire agreement between you and WILL-MARKETS and govern your use of
              the WEBSITE.

              LINK THE WEBSITE
              YOU MAY NOT LINK TO OR FRAME THE WEBSITE, OR ANY PORTION
              THEREOF, EXCEPT AS PROVIDED HEREIN OR WITH PRELIMINARY
              EXPRESS AND EVIDENCED CONSENT OF WILL-MARKETS.
              1. Intellectual Property 

              Upon linking to the WEBSITE pursuant to the TCU, you will be granted a non-exclusive, nontransferable, royalty-free sub-license to use the WILL-MARKETS mark owned by WILLMARKETS solely for providing an underlined, textual link from your website to www.willmarkets.com. No other use of WILL-MARKETS marks, names or logos is permitted without
              express written permission from WILL-MARKETS.
              
            
              2.Restrictions on Linking to the WEBSITE

              Without limiting other provisions contained in the TCU, you may include a link(s) on your
              website to www.will-markets.com publicly accessible Web pages. You may not link
              to www.will-markets.com any site containing an inappropriate, profane, defamatory,
              infringing, obscene, indecent or unlawful topic, name, material including but not limited to
              pictures, videos, or information that violates any applicable intellectual property, proprietary,
              privacy or publicity rights.

               `
              : `두카스코피 은행 SA 웹사이트의
              액세스 및 사용에 관한 이용 약관
              이 사이트를 사용하기 전에 이 웹 사이트("TCU")에 대한 사용 약관을 모두
              읽어보시기 바랍니다. 이 웹 사이트에 액세스, 링크 또는 이 웹 사이트를 통해
              액세스할 수 있는 모든 서비스를 계속 이용함으로써 귀하는 TCU 의 수락을
              의미합니다. WILL-MARKETS 는 언제든지 TCU 를 수정, 제거 또는 추가할
              권리를 보유합니다. 이러한 수정은 즉시 효력을 갖는다. 따라서 WILL-MARKETS
              의 웹 사이트(이하 "웹사이트")에 액세스, 연결 또는 사용할 때마다 TCU 를 계속
              검토하십시오. TCU 에 수정 사항을 게시한 후 웹사이트에서 액세스할 수 있는
              웹사이트 또는 서비스의 액세스, 링크 또는 사용은 수정된 TCU 의 수락을
              구성합니다. 언제든지 TCU 를 수락하지 않으려면 웹 사이트에 액세스, 링크 또는
              사용할 수 없습니다. TCU 와 충돌하거나 충돌하는 경우 WILL-MARKETS 에 의해
              명시적으로 거부되며 효력이 없는 귀하가 제안한 모든 이용 약관은 없습니다.
              일반 용어
              1. TCU 에 대한 사용자 동의
              귀하는 TCU 에 구속되는 것을 읽고 동의한다는 것을 나타냅니다.
              2. 지적 재산권
              텍스트, 콘텐츠, 사진, 비디오, 오디오, 링크, 소프트웨어 및 그래픽을 포함하되
              이에 국한되지 않는 웹 사이트는 저작권, 상표, 서비스 마크, 국제 조약 및/또는
              스위스 및 기타 국가의 기타 독점 권익 및 법률에 의해 보호됩니다. 또한
              웹사이트는 스위스 저작권 및 기타 법률 및 조약에 따라 집단 저작물 또는
              편집으로 보호됩니다. 웹사이트를 구성하는 모든 개별 기사, 열 및 기타 요소도
              저작권이 있습니다. 귀하는 웹사이트에 포함된 추가 저작권 고지 또는 제한
              사항뿐만 아니라 모든 해당 저작권 및 기타 법률을 준수하는 데 동의합니다.
              귀하는 웹 사이트가 개발, 컴파일, 준비, 수정, 선택 및 WILL-MARKETS, 일반 및
              제한된 파트너, 및 해당 일반 파트너 및 계열사 (통칭하여 "WILL-MARKETS") 및
              기타 (특정 기타 정보 출처 포함)에 의해 개발및 상당한 시간의 지출을 통해 개발
              및 적용 된 판단의 기준의 적용을 통해 작성, 컴파일, 준비, 수정, 선택 및
              배치되었음을 인정합니다. 노력과 돈과 WILL-MARKETS 및 기타 사람들의
              귀중한 지적 재산을 구성합니다. 귀하는 본 계약 기간 중 및 이후에 웹 사이트에서
              권리를 가진 WILL-MARKETS 및 기타 모든 사람의 권리를 보호하고 WILLMARKETS 또는 해당 공급업체 및 콘텐츠, 장비 또는 기타("공급업체")가
              웹사이트의 계약, 법적 및 법률 권리를 보호하기 위해 이루어진 모든 합리적인
              서면 요청을 준수하기로 동의합니다. 귀하는 개인 또는 법인이 웹사이트의 무단
              액세스 또는 사용에 대해 인지하거나 웹사이트가 저작권, 상표 또는 기타 계약,
              법적 또는 법률권리를 침해한다는 주장을 인지한 후 WILL-MARKETS 에
              서면으로 통지하는 데 동의합니다. 귀하와 WILL-MARKETS 와 관련된 모든 출원
              및 등록을 포함하여 정부 당국, 국내 또는 외국의 법률에 따라 비밀, 특허, 상표,
              상표, 서비스 마크, 노하우 및 기타 유형의 모든 유형의 모든 권리와 영업권에
              대한 모든 현재 및 미래의 권리는 귀하와 WILL-MARKETS 사이에서와 같이 
              귀하와 WILL-MARKETS 사이에서와 같이 항상 WILL-MARKETS 의 유일한
              독점적 인 재산이 될 수 있습니다. 웹 사이트의 모든 현재 및 향후 권리(웹 사이트
              및 현재 또는 미래의 기술에 대한 웹사이트의 일부를 악용할 권리 포함)는 WILLMARKETS 에 독점적으로 사용할 수 있습니다. TCU 가 특별히 허용하는 경우를
              제외하고, 귀하는 웹사이트 또는 그 일부를 복사하거나 사용할 수 없습니다. 본
              명세서에서 특별히 허용되는 경우를 제외하고, 귀하는 WILL-MARKETS 의 사전
              서면 승인 없이는 지적 재산권 또는 웹사이트 또는 웹사이트 또는 웹사이트 또는
              웹사이트 또는 그 어떤 변형 또는 파생 상품에 대한 개별 참여자의 이름을 어떤
              목적으로든 사용할 수 없습니다.
              3. 사용 제한 사항
              귀하는 어떠한 불법적인 목적으로도, 법률 이나 규정을 위반하거나 TCU 와
              일치하지 않는 방식으로 웹사이트를 사용할 수 없습니다. 귀하와 WILLMARKETS 간의 서면 계약을 제외하고, 귀하는 웹사이트를 비상업적 사용 및
              이익을 위해서만 사용할 수 없으며, 다른 사람 또는 법인의 이익을 위해 또는
              사용하는 재판매 또는 기타 양도 또는 처분에 대해서만 사용할 수 없습니다.
              귀하는 WILL-MARKETS 또는 공급업체의 사업과 경쟁할 수 있는 방식으로
              웹사이트에 포함된 정보를 사용, 양도, 배포 또는 폐기하지 않을 것을 동의합니다.
              귀하는 웹 사이트에서 자료를 다운로드하거나 상업적으로 비상업적으로 사용할
              수 있는 경우를 제외하고는 웹 사이트의 일부를 복사, 복제, 재구성, 컴파일, 게시,
              표시, 수행, 수정, 업로드, 생성, 파생 저작물 생성, 전송 또는 임의의 방식으로
              사용할 수 없습니다. WILL-MARKETS 의 사전 서면 동의 없이는 웹 사이트에
              포함된 분석 및 프레젠테이션을 재순환, 재배포 또는 게시할 수 없습니다. WILLMARKETS 의 사전 서면 동의 없이는 무선 TV 또는 라디오 방송, 컴퓨터 네트워크
              또는 하이퍼링크 프레이밍을 포함하되 이에 국한되지 않는 다른 매체에 판매 또는
              배포를 위한 웹사이트의 일부를 제공할 수 없습니다. 웹 사이트와 그 안에 포함된
              정보는 어떠한 종류의 데이터베이스를 구성하는 데 사용될 수 없습니다.
              웹사이트는 귀하 또는 제 3 자가 액세스하거나 웹 사이트의 전부 또는 일부를
              포함하는 데이터베이스 WEBSITEs 를 배포하기 위해 데이터베이스에 저장(전체
              또는 일부)에 저장될 수 없습니다. 귀하는 귀하가 제 3 자에게 판매하거나 기여한
              데이터의 품질을 개선하기 위해 어떠한 방법으로도 웹사이트를 사용할 수
              없습니다.
              WILL-MARKETS 의 사전 서면 승인 없이 자금 또는 비즈니스에 대한 권유를
              포함하여 본질적으로 홍보를 하거나 정크 메일, 스팸, 체인 편지, 피라미드 방식
              등을 구성하는 경우, 웹 사이트를 통해 입력, 배포, 업로드, 게시, 이메일, 전송
              또는 기타 콘텐츠를 입력, 배포, 업로드, 이메일, 전송 또는 기타 사용할 수
              없습니다. (ii) 불법, 유해, 위협, 학대, 괴롭힘, 불법, 명예 훼손, 저속한, 음란,
              비방, 다른 사람의 사생활, 증오, 또는 인종적, 인종적, 인종적 또는 기타 불쾌한;
              (iii) 귀하는 법률 또는 계약 또는 신탁 관계(예: 고용 관계의 일환으로 또는 기밀
              유지 계약의 일환으로 학습또는 공개된 내부 정보, 독점 및 기밀 정보)에 따라
              사용할 권리가 없습니다. (iv) 당사자의 특허, 상표, 영업 비밀, 저작권 또는 기타
              소유권을 침해하는 행위 (v) 소프트웨어 바이러스 또는 기타 컴퓨터 코드, 파일
              또는 프로그램을 포함하여 컴퓨터 소프트웨어 또는 하드웨어 또는 통신 장비의
              기능을 방해, 파괴 또는 제한하도록 설계된 프로그램이 포함됩니다. (vi) 
              미성년자에게 유해합니다. 또는 (vii)는 그러한 사람이 귀하에게 공개할 권한이
              없는 다른 사람의 개인 식별 정보를 구성합니다.
              귀하는 WILL-MARKETS 의 상표, 상표, 서비스 마크, 저작권 또는 로고를 어떠한
              방식으로도 사용할 수 없으며, 이러한 상품이 귀하와 속하거나 연관되거나 WILLMARKETS 의 동의와 함께 사용되었다는 인상을 심어주며, 귀하는 그러한 품목의
              소유권이 없음을 인정합니다.
              웹 사이트의 적절한 작동, 웹 사이트 또는 웹 사이트 또는 웹 사이트에 연결된
              서버 또는 네트워크를 통해 수행된 모든 활동을 방해하거나 방해하거나
              방해하려고 시도할 수 없습니다. 귀하는 웹 사이트의 공개 디스플레이 또는 웹
              사이트의 가시 링크로 접근성을 통해 의도적으로 공개적으로 공개되지 않은 웹
              사이트의 자료 또는 정보를 얻거나 얻으려고 시도할 수 없습니다. 귀하는 해킹,
              DDoS 공격, 암호 타이밍 또는 기타 수단을 통해 웹 사이트, 데이터, 자료, 정보,
              컴퓨터 시스템 또는 웹 사이트와 연결된 서버에 대한 무단 액세스를 시도하거나
              웹 사이트의 보안을 위반해서는 안됩니다. 귀하는 WILL-MARKETS 의 단독
              재량에 따라 웹 사이트 또는 웹 사이트의 인프라에 불합리하거나 불균형적으로 큰
              부하 또는 부담을 부과하거나 부과할 수 있는 어떠한 조치도 취하지 않을 수
              있습니다. 귀하는 웹사이트의 일부에 액세스, 획득, 복사 또는 모니터링하기 위해
              "스크레이퍼", "로봇", "로봇", "봇", "스파이더", "데이터 마이닝", "컴퓨터 코드"
              또는 기타 자동화 장치, 프로그램, 도구, 알고리즘, 프로세스 또는 방법론, 웹
              사이트를 통해 발견되거나 액세스된 데이터 또는 콘텐츠 또는 DASUK 의 사전
              서면 동의 없이 다른 웹사이트 정보를 사용하거나 사용하려고 시도해서는 안
              됩니다. 다른 콘텐츠의 출처를 위장하기 위해 헤더를 위조하거나 식별자를 조작할
              수 없습니다.
              귀하는 웹 사이트가 그 자체로 WILL-MARKETS 서비스를 구성하지 않는다는
              통보와 이해가 있음을 확인합니다.
              4. 면허
              (i) 귀하는 TCU 에 따라 웹사이트를 사용할 수 있는 제한된 권리 이외의 웹사이트
              및 웹사이트 및 웹사이트에 포함된 자료의 권리 나 라이선스를 절대적으로
              취득하지 않습니다. 웹사이트에서 콘텐츠를 다운로드하도록 선택한 경우 TCU 에
              따라 콘텐츠를 다운로드해야 합니다. 이러한 다운로드는 TCU 에 따라 자신의
              개인, 비상업적 사용에 대해서만 WILL-MARKETS 에 의해 귀하에게 허가되며
              다른 권리를 귀하에게 양도하지 않습니다.
              (ii) DUKASCOPY 가 달리 명시하지 않는 한 웹 사이트 또는 WILL-MARKETS
              또는 그 대리인에게 자료를 제출하는 경우, 귀하는 WILL-MARKETS 에
              영구적이고, 비독점적이고, 돌출할 수 없으며, 완전 지불, 로열티 프리, 서브
              라이선스 및 양도 가능(전부 또는 부분적으로) 전 세계 모든 미디어에서 전
              세계적으로 권리와 라이선스를 부여합니다. WILL-MARKETS 의 재량에 따라
              귀하 또는 다른 사람 또는 단체에 대한 추가 통지, 귀속 또는 고려 사항 없이 어떤
              목적으로든(광고, 상업적, 홍보 및 홍보 목적 포함)에 따라 이러한 콘텐츠를 수정,
              배포, 복사 및 기타 악용하는 파생 작품을 수정, 배포, 복사 및 기타 악용합니다.
              또한 다른 웹사이트의 사용자가 해당 사용자의 개인적인 용도에 대해 해당 자료에
              액세스, 저장 또는 복제할 수 있도록 허용합니다. 귀하는 WILL-MARKETS 에
              해당 콘텐츠와 관련하여 제출하는 이름을 사용할 수 있는 권한을 부여합니다. 
              귀하는 귀하가 제출한 자료에 대한 모든 권리를 소유하거나 통제하도록 진술하고
              보증합니다. 귀하가 제출한 자료가 진실되고 정확하다는 것입니다. 귀하가
              공급하는 자료의 사용은 이 TCU 를 위반하지 않으며 개인 또는 단체에 상해를
              입히지 않습니다. WILL-MARKETS 및 공급업체, 대리인, 이사, 임원, 직원,
              대표자, 후임자를 배상하고 귀하가 공급하는 자료로 인한 모든 청구에 대해
              배상할 것입니다. WILL-MARKETS 및 공급업체, 대리인, 이사, 임원, 직원,
              대표자, 후계자 및 할당은 책임을 부인하며 귀하 또는 제 3 자가 제출한 자료에
              대해 어떠한 책임도 지지 않습니다.
              5. 수수료
              명시적 서면 계약을 제외하고, 웹사이트의 액세스 및 사용은 무료이며 WILLMARKETS 또는 그룹 회사의 고객이 될 필요는 없습니다.
              6. 거주지 및 법적 제한
              웹사이트 규정은 어떤 이유로든 웹사이트 또는 그 일부에 대한 액세스 및 사용이
              금지되거나 엄격하게 규제되는 관할권 거주자를 대상으로 하지 않습니다. 이러한
              제한사항이 적용되는 경우 웹 사이트 또는 해당 부분에 액세스하여 사용할 수
              없습니다. 웹사이트의 모든 거래 관련 정보는 벨기에 거주자에게 는 의도되지
              않습니다.
              7. 면책 조항 및 책임 제한
              (i) 귀하는 귀하의 서비스 사용이 귀하의 단독 위험에 처해 있다는 데 동의하며,
              콘텐츠 또는 광고를 포함하되 이에 국한되지 않는 서비스 및 웹사이트에 포함된
              모든 것이 "있는 대로" 및 "가능한 한"제공되며, WILL-MARKETS 는 웹사이트와
              관련해서는 어떠한 종류의, 명시적 또는 묵시적 보증을 하지 않는다는 것을
              인정합니다. 특정 목적 또는 사용에 대한 가맹점성, 비침해, 소유권 또는 적합성을
              포함하되 이에 국한되지 않습니다.
              (ii) WILL-MARKETS 는 웹 사이트가 귀하의 장비와 호환되거나 웹 사이트 또는
              WILL-MARKETS 또는 그 대리인이 보낸 전자 메일이 오류 또는 바이러스, 웜
              또는 "트로이 목마" 또는 기타 유해하고 침략적이거나 손상된 파일이 없다고
              보증하지 않으며, 이러한 파괴적인 기능으로 인해 발생할 수 있는 손상에 대해
              책임을 지지 않습니다. 귀하는 WILL-MARKETS 및 그 공급업체, 주주, 대리인,
              임원, 직원, 대표자, 후임자, 그리고 할당에 대해 책임을 지지 않는다는 데
              동의합니다: (i) WILL-MARKETS 의 과실로 인한 상해 또는 손해, 해당 계열사,
              공급업체, 대리인, 대리인, 이사, 임원, 대표자, 일반 파트너, 자회사, 후임자,
              그리고 웹사이트의 다른 대리인과 관련이 없는 경우, 손실 된 이익, 손실, 징벌적,
              부수적 또는 결과적 손해, 또는 다른 당사자에 의한 WILL-MARKETS 에 대한
              청구; 또는 (ii) 귀하의 컴퓨터 장비로 인해 또는 해당 장비에 웹 사이트를
              사용하여 발생하는 웹 사이트의 오류, 부정확성, 누락, 지연 또는 기타 오류. 웹
              사이트에 연결될 수 있는 다른 웹사이트, 서비스, 상품 또는 광고의 내용은 WILLMARKETS 에 의해 유지 관리되거나 제어되지 않습니다. 따라서 WILLMARKETS 는 웹 사이트에 연결되거나 광고될 수 있는 다른 웹 사이트, 서비스
              또는 상품의 가용성, 콘텐츠 또는 정확성에 대해 책임을 지지 않습니다. WILLMARKETS 는 (a) 웹사이트에 제공된 링크의 사용과 관련하여 보증, 명시적 또는
              묵시적 보증을 하지 않습니다. (b) 웹사이트에 링크될 수 있는 다른 웹사이트,
              서비스, 상품 또는 광고의 정확성, 완전성, 유용성 또는 적합성을 보장합니다. 
              또는 (c) 웹사이트에 링크될 수 있는 다른 웹사이트, 서비스, 상품 또는 광고를
              보증, 명시 또는 묵시적인 행위. WILL-MARKETS 는 또한 웹 사이트에
              액세스하는 데 사용하는 전화선, 무선 서비스, 통신 미디어 및 장비의 신뢰성 또는
              지속적인 가용성에 대해 책임을지지 않습니다. 귀하는 웹 사이트의 WILLMARKETS 및/또는 제 3 자 기여자가 언제든지 TCU 에 따라 콘텐츠에 액세스하는
              것을 금지하거나 금지하도록 선택할 수 있음을 이해하고 인정합니다.
              (iii) 귀하는 (i) 웹사이트가 정보 목적으로만 제공된다는 것을 인정합니다. (ii)
              웹사이트에는 증권 거래소 및 전 세계 다른 출처에서 가져온 특정 정보가 포함될
              수 있습니다. (iii) WILL-MARKETS 는 웹 사이트의 특정 목적 또는 적시성에 대한
              시퀀스, 정확성, 완전성, 적합성을 보장하지 않습니다. (iv) 웹 사이트의 특정
              부분의 제공은 WILL-MARKETS 가 당사자인 다른 계약의 이용 약관의 적용을
              받습니다. (v) 웹 사이트에 포함된 정보는 WILL-MARKETS 가 보안 또는 기타
              금융 상품 또는 서비스를 사용, 구매 또는 판매하거나 보안 또는 서비스의 수익성
              또는 적합성에 관한 법률, 세금, 회계 또는 투자 자문 또는 서비스를 제공하는
              권유, 제안, 의견 또는 권고를 구성하지 않습니다. (vi) 웹사이트에 제공된 정보는
              그러한 사용 또는 배포가 법률 또는 규정에 위배되는 모든 관할권 또는 국가의
              개인 또는 법인에 사용하거나 배포하기 위한 것이 아닙니다. 따라서, WILLMARKETS, 공급업체, 대리인, 이사, 임원, 직원, 대표자, 후임자 및 할당에 대해
              귀하 또는 다른 사람에게 직접 또는 간접적으로 책임을 지지 아니므로, (a)
              웹사이트의 부정확함 또는 오류 또는 누락에 국한되지 않음, 및 금융 견적에
              국한되지 않음에도 불구하고, 이에 반하는 것은 무엇이든 (b) 웹사이트의 전송
              또는 전송 중단 및/또는 콘텐츠의 일부를 지연, 오류 또는 중단하는 행위 또는 (c)
              그로부터 발생하거나 그에 의한 손해, 또는 비성능의 이유로 발생하는 손실 또는
              손상.
              (iv) 과실을 포함하되 이에 국한되지 않는 어떠한 경우에도 WILL-MARKETS,
              공급업체, 대리인, 이사, 임원, 직원, 대표자, 후임자 또는 대리인, 대리인, 후계자
              또는 대리인이 직접, 간접, 부수적, 결과적, 특별, 징벌적 또는 예견된 손해에 대해
              귀하에게 책임을 져야 하며, WILL-MARKETS 는 웹사이트 또는 웹사이트의
              웹사이트 또는 링크의 사용 또는 무능력으로 인해 발생하는 손해의 가능성에 대해
              구체적으로 통보된 경우에도 예를 들어, 매출 손실 또는 예상 이익 또는 손실 사업
              손실과 같이 이에 국한되지 않습니다. 관련 법률은 책임 또는 부수적 또는 결과적
              손해의 제한 또는 배제를 허용하지 않을 수 있습니다. 어떠한 경우에도 WILLMARKETS 는 모든 손해, 손실 및 행동 원인에 대해 귀하에게 전적인 책임을 지지
              않습니다(계약 또는 불법 행위의 경우, 과실을 포함하되 이에 국한되지 않음)은
              귀하가 웹 사이트에 액세스하기 위해 WILL-MARKETS 에 지불한 금액을
              초과합니다.
              8. 이 TCU 에 동의하는 귀하의 권한
              귀하는 스위스 민법 제 12 항에 따라 본 계약을 체결할 수 있는 권한과 권한을
              가지고 있음을 진술하고, 영장하고, 성약을 맺는다.
              9. 배상
              귀하는 귀하의 비용으로 무해한 WILL-MARKETS, 공급업체, 대리인, 이사, 임원,
              직원, 대표자, 후계자 및 합리적인 변호사 및 전문가 비용을 포함한 모든 청구,
              손해, 책임, 비용 및 비용을 배상, 방어 및 보유하는 데 동의합니다. (i) 귀하의 
              사용 또는 컴퓨터의 웹사이트 사용을 사용하는 사람 포함하되 이에 국한되지
              않음; (ii) 귀하 또는 귀하의 컴퓨터를 사용하는 사람(또는 해당되는 경우 계정)에
              의한 TCU 위반; (iii) 귀하 또는 귀하의 컴퓨터를 사용하는 사람이 웹사이트를
              사용하는 것이 제 3 자의 지적 재산권 또는 개인 정보 보호 또는 홍보권을
              침해하거나 명예 훼손또는 제 3 자에게 상해 또는 손상을 초래한다는 주장; (iv)
              귀하 또는 귀하의 컴퓨터를 사용하는 사람이 웹사이트를 삭제, 추가, 삽입 또는
              변경하거나 무단으로 사용하는 행위 (v) 본 인에 포함된 귀하가 작성한 진술 또는
              보증위반 또는 (vi) 본 약관에서 귀하가 이행할 성약이나 동의를 위반하는 행위.
              귀하는 그러한 청구, 소송, 소송 또는 소송 및 소송 절차및 소송으로 인해
              발생하거나 그 와 관련하여 또는 기타 발생하거나 발생하거나 발생하는 합리적인
              변호사 의 수수료 및 비용을 포함하되 이에 국한되지 않는 모든 비용, 손해 및
              비용을 지불하는 데 동의합니다. WILL-MARKETS 는 자신의 비용으로 귀하가
              배상할 수 있는 모든 사안의 독점적인 방어 및 통제권을 보유하며, 이 경우 WILLMARKETS 에 전적으로 협력하여 사용 가능한 방어를 주장할 수 있습니다.
              귀하는 TCU 에 따라 WILL-MARKETS 가 제기한 모든 소송및 웹사이트에
              적용되는 기타 이용 약관과 관련하여 발생한 WILL-MARKETS 의 합리적인
              변호사 비용을 인정하고 이에 동의합니다.
              10. 어미
              귀하는 웹사이트의 액세스 및 사용을 중단하고 웹사이트에서 얻은 모든 자료를
              파기함으로써 언제든지 원인 없이 TCU 를 종료할 수 있습니다.
              귀하는 예고 없이 WILL-MARKETS 가 TCU 를 종료하거나 언제든지 발생 하거나
              없이 웹사이트에 대한 액세스를 중단할 수 있으며 즉시 효력을 발생시킬 수
              있다는 데 동의합니다. WILL-MARKETS 의 단독 재량에 따라 TCU 의 규정을
              준수하지 않을 경우 WILL-MARKETS 의 통지 없이 즉시 종료됩니다.
              WILL-MARKETS 는 웹사이트의 해지 또는 정지 및/또는 후자에 대한 액세스 또는
              웹사이트의 해지 또는 정지와 관련된 청구에 대해 귀하 또는 제 3 자에게 책임을
              지지 않습니다. 귀하 또는 WILL-MARKETS 가 TCU 를 종료한 후 웹 사이트의
              액세스 및 사용을 중단하고 웹 사이트에서 얻은 모든 자료와 해당 사본을 즉시
              파기해야 합니다.
              11. 관련 법률 및 관할권
              TCU 의 성능과 TCU 에서 발생하는 모든 의무의 장소는 스위스 제네바입니다.
              TCU 는 스위스 사립 국제법법과 같은 법률 규칙의 충돌에 대한 언급 없이 스위스
              법에 따라 유일하고 독점적인 통치법으로 해석되어야 합니다.
              모든 분쟁, 논쟁 또는 주장으로 인해 발생, 또는 와 관련하여, TCU, 유효성을
              포함, 무효, 위반, 또는 종료, 중재 통지가 이 규칙에 따라 제출되는 날짜에 발효
              스위스 챔버의 국제 중재 기관의 국제 중재의 스위스 규칙에 따라 중재에 의해
              해결되어야한다. 중재인의 수는 규칙이 달리 명시하지 않는 한 세 가지로 한다.
              중재의 자리는 제네바, 스위스한다. 중재 절차는 영어로 진행되어야 한다.
              이 섹션은 TCU 의 종료를 생존한다.
              12. 잡다한
              WILL-MARKETS 는 WILL-MARKETS 의 단독 재량에 따라 언제든지 웹 사이트의
              모든 측면의 접근성, 콘텐츠 또는 기술 사양을 변경할 권리가 있음을 인정합니다.
              또한 이러한 변경으로 인해 웹 사이트에 액세스 및/또는 사용할 수 없게 될 수 
              있음을 더욱 인정합니다. WILL-MARKETS 가 TCU 의 권리 또는 조항을
              행사하거나 집행하지 못하는 것은 그러한 권리 또는 조항의 포기로 간주되지
              않습니다. 섹션 2 ~13 TCU 의 종료를 생존한다.
              웹사이트의 영어 버전과 웹사이트의 다른 언어 버전 간에 불일치하는 경우, 영어
              버전이 우선합니다. 다른 언어로 웹 사이트의 번역은 두카스 카피에 바인딩되지
              않습니다.
              13. 머리글
              TCU 의 섹션 제목은 귀하와 WILL-MARKETS 의 편의를 위해서만 사용되며 법적
              또는 계약적 의미가 없습니다.
              14. 분리
              언제든지 TCU 의 조항이 불법이거나 무효이거나 관할권의 법률에 따라 어떠한
              경우에도 시행될 경우, 해당 조항은 허용되는 최대 범위까지 시행되며 해당
              관할권 또는 적법성에 따라 TCU 의 나머지 조항의 적법성, 유효성 또는 집행
              가능성, 다른 관할권의 법률에 따라 그러한 조항의 유효성 또는 집행 가능성은
              어떤 식으로든 영향을 받습니다.
              15. 전체 계약
              TCU 및 웹사이트의 기타 이용 약관 및 그 후속 약관은 귀하와 WILL-MARKETS
              간의 전체 계약을 구성하며 웹사이트 사용을 관리합니다.
              웹 사이트 링크
              귀하는 본 안에 제공된 경우 또는 WILL-MARKETS 의 예비 명시적 및 입증된
              동의를 제외하고는 웹사이트 또는 그 일부를 링크하거나 프레임할 수 없습니다.
              1. 지적 재산권
              TCU 에 따라 웹 사이트에 연결하면 웹 사이트에서 www.will-markets.com 위해
              줄지어 줄 지어 텍스트 링-크를 제공하는 데만 WILL-MARKETS 가 소유한 WILLMARKETS 마크를 사용하는 비독점적이고 양도 할 수없는 로열티프리 하위
              라이선스가 부여됩니다. WILL-MARKETS 의 마크, 이름 또는 로고를 WILLMARKETS 의 명시적 서면 허가 없이는 사용할 수 없습니다.
              2. 웹사이트 연결 제한
              TCU 에 포함된 다른 조항을 제한하지 않고 공개적으로 액세스할 수 있는 웹
              페이지를 사이트에서 www.will-markets.com 위해 웹 사이트에 링크(들)를
              포함할 수 있습니다. 귀하는 부적절하거나, 불경스럽고, 명예를 훼손하고, 침해,
              음란하거나 불법적인 주제, 이름, 사진, 비디오 또는 해당 지적 재산권, 독점,
              프라이버시 또는 홍보 권리를 침해하는 정보를 포함하되 이에 국한되지 않는
              자료를 포함하는 사이트에 사이트에서 www.will-markets.com 링크할 수
              없습니다.`}
          </PreText>
        </Wrapper>
      </RsWrapper>
    </ClientLayout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Terms;
